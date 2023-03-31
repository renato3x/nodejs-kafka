require('express-async-errors')
require('./database/connection')

const { router } = require('./routes')
const { ErrorHandler } = require('./middlewares/ErrorHandler')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(ErrorHandler)
app.use(cors())
app.use('/v1', router)

module.exports = { app }
