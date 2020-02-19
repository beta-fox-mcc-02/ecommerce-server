const express = require('express')
const router = express.Router()
const admins = require('./admin')
const products = require('./products')

router.use('/admins', admins)
router.use('/products', products)

module.exports = router