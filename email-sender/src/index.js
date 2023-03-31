require('dotenv').config()
require('./database/connection')

const { kafka } = require('./messaging/kafka/kafka')
const { log } = require('./utils')
const { EmailService } = require('./services/email')
const { Partitioners } = require('kafkajs')

const main = async() => {
  const consumer = kafka.consumer({
    groupId: 'email-group',
    allowAutoTopicCreation: true,
    readUncommitted: true
  })

  const producer = kafka.producer({
    allowAutoTopicCreation: true,
    createPartitioner: Partitioners.DefaultPartitioner
  })

  await consumer.connect()
  await consumer.subscribe({ topic: 'user.new', fromBeginning: true })

  await producer.connect()

  await consumer.run({
    eachMessage: async ({ message }) => {
      const userJSON = message.value.toString()

      if (!userJSON) {
        return
      }

      const user = JSON.parse(userJSON)
      
      log('INFO', `Send email from ${user.email}`)

      try {
        const email = await EmailService.create(user)
        log('INFO', 'Email was sended and recorded on database', email)
      } catch (error) {
        log('ERROR', 'An error occurred', error)

        producer.send({
          topic: 'user.new.DLT',
          messages: [
            {
              value: JSON.stringify(user)
            }
          ]
        })
      }
    }
  })
}

main().then(() => {
  log('INFO', 'Listening messages from Kafka')
})
