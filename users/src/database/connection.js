const mongoose = require('mongoose')

module.exports = mongoose.connect(process.env.MONGODB_PORT)
.then(() => {
  console.log('Connection established')
})
.catch(console.log)
