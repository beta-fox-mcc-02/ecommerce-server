const express = require ('express')
const router = express.Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')

router.use('/', (req, res) => {
   res.send(`halo ganang, you're connected to server!`)
})
router.use('/users', userRouter)
router.use('/products', productRouter)

module.exports = router