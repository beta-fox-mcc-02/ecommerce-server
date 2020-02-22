const router = require('express').Router()
const UserController = require('../controllers/UserController')

//login
router.post('/', UserController.login)

//register
router.post('/register', UserController.register)

module.exports = router