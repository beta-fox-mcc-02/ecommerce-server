const router = require('express').Router()
const userRouter = require('./users')
const productRouter = require('./product')
const cartRouter = require('./cart')

router.use('/', userRouter)
router.use('/products', productRouter)
router.use('/cart', cartRouter)
module.exports = router  
