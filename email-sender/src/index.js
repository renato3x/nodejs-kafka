require('dotenv').config()

const { kafka } = require('./messaging/kafka/kafka')
const { faker } = require('@faker-js/faker')
const chalk = require('chalk')

async function main() {
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

      await asyncTimeout(() => {
        if (faker.random.numeric(2) % 2 === 0) {
          throw new Error('Erro ao enviar email')
        }

        log('INFO', 'Sent with success!')
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
  log('INFO', 'Listening messages from Kafka')
})
