const router = require('express').Router()
const adminRouter = require('./admin.js')
const productRouter = require('./product.js')
const categoryRouter = require('./category.js')
const cors = require('cors')

const corsOptions = {
  origin: 'https://ecommerce-cmsv1.firebaseapp.com',
  optionsSuccessStatus: 200
}

router.options('*', cors(corsOptions))
router.use('/admin', adminRouter)

router.use('/product', productRouter)
router.use('/products', productRouter)

router.use('/category', categoryRouter)

module.exports = router