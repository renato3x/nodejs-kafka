const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'email-app',
  brokers: [process.env.KAFKA_BROKER],
  retry: {
    retries: 5,
    initialRetryTime: 500
  }
})

module.exports = { kafka }
