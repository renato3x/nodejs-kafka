const mongoose = require('mongoose')

module.exports = mongoose.connect(process.env.MONGODB_CONNECTION_URL)
.then(() => {
  console.log('Connection established')
})
.catch(console.log)
