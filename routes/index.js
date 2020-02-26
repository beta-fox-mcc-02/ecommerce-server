const express = require('express')
const router = express.Router()
const admin = require('./adminRoutes')
const product = require('./productRoutes')
const customers = require('./customerRoutes')

router.use('/admins', admin)
router.use('/customers', customers)
router.use('/products', product)

module.exports = router