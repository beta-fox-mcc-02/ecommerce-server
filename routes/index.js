const router = require('express').Router()
const userRouter = require('./userRouter.js')
const productRouter = require('./productRouter')

router.get('/', (req, res) => res.send('Ecommerce API'))
router.use('/users', userRouter)
router.use('/products', productRouter)

module.exports = router
