const router = require('express').Router()
const userRouter = require('./user.router')
const indexRouter = require('./index.router')

router.use(userRouter)
router.use(indexRouter)

module.exports = { router }
