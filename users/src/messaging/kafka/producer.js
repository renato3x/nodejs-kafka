const { kafka } = require('./kafka')

const producer = kafka.producer({
  allowAutoTopicCreation: true
})

producer.connect().then(() => {
  console.log('[User] Kafka producer connected')
})

module.exports = { producer }
