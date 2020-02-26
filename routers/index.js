const express = require('express')
const router = express.Router()
const admins = require('./admin')
const products = require('./products')
const customers = require('./customer')

router.use('/admins', admins)
router.use('/products', products)
router.use('/customers/', customers)

module.exports = router