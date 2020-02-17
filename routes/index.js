const router = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')

router.use('/', userRoutes)
// router.use('/product', productRoutes)

module.exports = router