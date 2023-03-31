const { Schema, model } = require('mongoose')

const Email = model('Email', new Schema({
  username: {
    required: true,
    type: String
  },
  email: {
    type: String,
    required: true
  }
}, { timestamps: true }))

module.exports = { Email }
