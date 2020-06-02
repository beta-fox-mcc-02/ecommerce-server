const router = require('express').Router()
const admin = require('./admin')
const product = require('./product')
const costumer = require('./costumer')
const error = require('../middlewares/errorHandler')

router.use('/admin', admin)
router.use('/products', product)
router.use('/costumers', costumer)
router.use(error)

module.exports = router