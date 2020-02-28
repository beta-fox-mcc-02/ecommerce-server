const express = require('express')
const productRouter = require('./product')
const cartRouter = require('./cart')
const UserController = require('../controllers/userController')
const CategoryController = require('../controllers/categoryController')

const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use('/products', productRouter)
router.use('/cart', cartRouter)

router.get('/categories', CategoryController.getAll)
router.get('/categories/:id', CategoryController.findProduct)

module.exports = router