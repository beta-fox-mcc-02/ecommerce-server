const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/signUp', UserController.userSignUp)
router.post('/signIn', UserController.userSignIn)

module.exports = router