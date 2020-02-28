const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/userController')

router.post('/signUp', AdminController.adminSignUp)
router.post('/signIn', AdminController.adminSignIn)

module.exports = router