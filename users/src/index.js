require('express-async-errors')
require('./database/connection')

const { router } = require('./routes')
const { ErrorHandler } = require('./middlewares/ErrorHandler')
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(ErrorHandler)
app.use('/v1', router)

module.exports = { app }
