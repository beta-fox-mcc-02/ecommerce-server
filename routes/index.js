const express = require('express')
const router = express.Router()
const UserRoutes = require('./UserRoutes')
const ProductRoutes = require('./ProductRoutes')

router.use('/', UserRoutes)
router.use('/products', ProductRoutes)
module.exports = router