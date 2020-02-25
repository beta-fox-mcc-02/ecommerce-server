const express = require ('express')
const router = express.Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const cartRouter = require ('./cartRouter')

// router.use('/', (req, res) => {
//    res.send(`halo ganang, you're connected to server!`)
// })
router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/carts', cartRouter)

module.exports = router