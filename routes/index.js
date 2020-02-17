const router = require('express').Router()
const adminRouter = require('./admin.js')
const productRouter = require('./product.js')
const { authentication } = require('../middlewares/secureUserIdentificator.js')

router.use('/admin', adminRouter)
router.use('/product', authentication, productRouter)

module.exports = router