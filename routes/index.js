const express = require('express')
const router = express.Router()
const admin = require('./adminRoutes')
const product = require('./productRoutes')

router.use('/admins', admin)
router.use('/products', product)

module.exports = router