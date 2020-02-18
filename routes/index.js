const express = require('express')
const productRouter = require('./product')
const UserController = require('../controllers/userController')


const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
    
router.use('/products', productRouter)

module.exports = router