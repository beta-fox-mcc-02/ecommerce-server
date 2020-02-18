const router = require('express').Router()
const admin = require('./admin')
const product = require('./product')
const error = require('../middlewares/errorHandler')

router.use('/admin', admin)
router.use('/products', product)
router.use(error)

module.exports = router