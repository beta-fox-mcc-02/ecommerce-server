const express = require('express')
const router = express.Router()
const admin = require('./adminRoutes')
const product = require('./productRoutes')
const customers = require('./customerRoutes')
const cart = require('./cartRoutes')

router.use('/admins', admin)
router.use('/customers', customers)
router.use('/products', product)
router.use('/cart', cart)

module.exports = router