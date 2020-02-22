const router = require('express').Router()
const user = require('./user')
const product = require('./product')

router.use('/admin', user)
router.use('/admin/product', product)

module.exports = router