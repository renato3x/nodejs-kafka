const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'users-app',
  brokers: ['172.24.0.4:9092']
})

module.exports = { kafka }
