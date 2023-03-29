const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'users-app',
  brokers: [process.env.KAFKA_BROKER]
})

module.exports = { kafka }
