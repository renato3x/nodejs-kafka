const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'app',
  brokers: ['172.23.0.4:9092']
})

module.exports = { kafka }
