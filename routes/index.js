const router = require('express').Router()
const userRouter = require('./userRouter.js')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')
const orderRouter = require('./orderRouter')

router.get('/', (req, res) => res.send('Ecommerce API'))
router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/carts', cartRouter)
router.use('/orders', orderRouter)

module.exports = router
