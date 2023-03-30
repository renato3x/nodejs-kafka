require('dotenv').config()

const { kafka } = require('./messaging/kafka/kafka')
const chalk = require('chalk')

async function main() {
  const consumer = kafka.consumer({ groupId: 'email-group', allowAutoTopicCreation: true })

  await consumer.connect()
  await consumer.subscribe({ topic: 'user.new' })

  await consumer.run({
    eachMessage: async ({ message }) => {
      const userJSON = message.value.toString()

      if (!userJSON) {
        return
      }

      const user = JSON.parse(userJSON)

      log('Send New Email', `send email from ${user.email}`)
      log('Send New Email', 'Feito com sucesso!')
    },
    
  })
}

function log(prefix, ...message) {
  const formattedPrefix = chalk.blue(`[${prefix}]`)
  console.log(`${formattedPrefix}`, ...message)
}

main().then(() => {
  log('Email Sender', 'Listening messages from Kafka')
})
