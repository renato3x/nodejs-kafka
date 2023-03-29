const { Schema, model } = require('mongoose')

const User = model('User', new Schema({
  username: {
    required: true,
    type: String
  },
  email: {
    type: String,
    required: true
  }
}, { timestamps: true }))

module.exports = { User }
