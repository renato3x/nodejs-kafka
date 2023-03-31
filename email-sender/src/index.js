require('dotenv').config()
require('./database/connection')

const { kafka } = require('./messaging/kafka/kafka')
const { log } = require('./utils')
const { EmailService } = require('./services/email')
const { Partitioners } = require('kafkajs')

const main = async() => {
  const newUserConsumer = kafka.consumer({
    groupId: 'email-group',
    allowAutoTopicCreation: true,
    readUncommitted: true
  })

  const newUserDLTConsumer = kafka.consumer({
    groupId: 'email-group-dlt',
    allowAutoTopicCreation: true,
    readUncommitted: true
  })

  const producer = kafka.producer({
    allowAutoTopicCreation: true,
    createPartitioner: Partitioners.DefaultPartitioner
  })

  await newUserConsumer.connect()
  await newUserConsumer.subscribe({ topic: 'user.new', fromBeginning: true })

  await newUserDLTConsumer.connect()
  await newUserDLTConsumer.subscribe({ topic: 'user.new.DLT', fromBeginning: true })

  await producer.connect()

  await newUserConsumer.run({
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

        await producer.send({
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

  await newUserDLTConsumer.run({
    eachMessage: async ({ message }) => {
      const dataJSON = message.value.toString()

      if (!dataJSON) {
        return
      }

      const data = JSON.parse(dataJSON)

      log('warn', 'Some error occurred with user', data)
    }
  })
}

main().then(() => {
  log('INFO', 'Listening messages from Kafka')
})
