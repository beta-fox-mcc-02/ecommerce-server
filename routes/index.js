const router = require('express').Router()
const userRouter = require('./users')
const productRouter = require('./product')
const cartRouter = require('./cart')
const CartController = require('../controllers/cartController')

router.patch('/checkout', CartController.checkOut)
router.use('/', userRouter)
router.use('/products', productRouter)
router.use('/cart', cartRouter)
// router.use(authentication)

module.exports = router  
