const router = require('express').Router()
const userRoutes = require('./user')
const ProductController = require('../controllers/productController')
const productRoutes = require('./product')
const categoryRoutes = require('./category')
const authentication = require('../middlewares/authentication')

router.get('/product', ProductController.allProduct)
router.get('/product/:productId', ProductController.getOneProduct)
router.use('/category', categoryRoutes)

router.use(userRoutes)

router.use(authentication)
router.use('/product', productRoutes)

module.exports = router