const router = require('express').Router()
const userRoutes = require('./user')
const adminRoutes = require('./admin')
const categoryRoutes = require('./category')
const productRoutes = require('./product')

router.use('/users', userRoutes)
router.use('/admin', adminRoutes)
router.use('/categories', categoryRoutes)
router.use('/products', productRoutes)
module.exports = router