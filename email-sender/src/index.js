require('dotenv').config()

const { kafka } = require('./messaging/kafka/kafka')
const chalk = require('chalk')

async function main() {
  const consumer = kafka.consumer({
    groupId: 'email-group',
    allowAutoTopicCreation: true,
    readUncommitted: true
  })

  await consumer.connect()
  await consumer.subscribe({ topic: 'user.new', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log(message.timestamp)

      const userJSON = message.value.toString()

      if (!userJSON) {
        return
      }

      const user = JSON.parse(userJSON)
      
      log('Send New Email', `Send email from ${user.email}`)

      await asyncTimeout(() => {
        log('Send New Email', 'Enviado com sucesso!')
      }, 3000)
    }
  })
}

function asyncTimeout(fn, ms = 1000) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      try {
        fn()
        resolve(id)
      } catch (error) {
        reject(error)
      }
    }, ms)
  })
}

function log(prefix, ...message) {
  console.log(`${chalk.blue(`[${prefix}]`)}`, ...message)
}

main().then(() => {
  log('Email Sender', 'Listening messages from Kafka')
})
