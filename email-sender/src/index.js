require('dotenv').config()
require('./database/connection')

const { kafka } = require('./messaging/kafka/kafka')
const { log } = require('./utils')
const { EmailService } = require('./services/email')

const main = async() => {
  const consumer = kafka.consumer({ groupId: 'email-group', allowAutoTopicCreation: true, readUncommitted: true })

  await consumer.connect()
  await consumer.subscribe({ topic: 'user.new', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ message }) => {
      const userJSON = message.value.toString()

      if (!userJSON) {
        return
      }

      const user = JSON.parse(userJSON)
      
      log('INFO', `Send email from ${user.email}`)

      const email = await EmailService.create(user)

      log('INFO', 'Email was sended and recorded on database', email)
    }
  })
}

main().then(() => {
  log('INFO', 'Listening messages from Kafka')
})
