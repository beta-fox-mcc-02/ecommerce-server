const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/login', UserController.login)
router.post('/register/admin', UserController.registerAdmin)
router.post('/register/user', UserController.registerUser)

module.exports = router