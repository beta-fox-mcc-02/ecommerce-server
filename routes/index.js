const router = require('express').Router()
const adminRouter = require('./admin.js')
const productRouter = require('./product.js')
const categoryRouter = require('./category.js')
const customerRouter = require('./customer.js')

router.use('/admin', adminRouter)
router.use('/admins', adminRouter)

router.use('/customer', customerRouter)

router.use('/product', productRouter)
router.use('/products', productRouter)

router.use('/category', categoryRouter)

module.exports = router