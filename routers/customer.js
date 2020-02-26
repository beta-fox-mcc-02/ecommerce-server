const express = require('express')
const router = express.Router()
const CustomerController = require('../controllers/customerController')

router.post('/register', CustomerController.register)
router.post('/login', CustomerController.login)

module.exports = router