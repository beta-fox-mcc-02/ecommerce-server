const router = require('express').Router()
const { UserController } = require('../controllers')
router.post('/login', UserController.login)
router.post('/', UserController.register)
module.exports = router