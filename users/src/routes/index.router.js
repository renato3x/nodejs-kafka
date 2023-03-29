const { IndexController } = require('../controllers/IndexController')
const router = require('express').Router()

router.get('/', IndexController.index)

module.exports = router
