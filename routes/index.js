const router = require('express').Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const bannerRouter = require('../routes/bannerRouter')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/banner', bannerRouter)

module.exports = router