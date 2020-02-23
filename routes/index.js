const router = require('express').Router()
const user = require('./admin')
const product = require('./product')

router.use('/admin', user)
router.use('/admin/product', product)

module.exports = router