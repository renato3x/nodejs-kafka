const { kafka } = require('./kafka')
const { Partitioners } = require('kafkajs')

const producer = kafka.producer({
  allowAutoTopicCreation: true,
  createPartitioner: Partitioners.DefaultPartitioner
})

producer.connect().then(() => {
  console.log('Kafka producer connected')
})

module.exports = { producer }
