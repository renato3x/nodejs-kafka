const { UserController } = require('../controllers/UserController')
const router = require('express').Router()

router.get('/user', UserController.index)
router.post('/user', UserController.create)
router.delete('/user/:id', UserController.deleteById)

module.exports = router
