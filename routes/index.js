const router = require('express').Router()
const adminRouter = require('./admin.js')
const productRouter = require('./product.js')
const categoryRouter = require('./category.js')
const customerRouter = require('./customer.js')
const transactionRouter = require('./transaction.js')
const ProductController = require('../controllers/productController.js')

router.use('/admins', adminRouter)
router.use('/customers', customerRouter)
router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use('/transactions', transactionRouter)

router.get('/item/:id', ProductController.findOne)

module.exports = router