const router = require('express').Router()
const admin = require('./admin')
const product = require('./product')

router.use('/admin', admin)
router.use('/admin/product', product)

module.exports = router