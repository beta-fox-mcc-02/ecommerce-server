const router = require('express').Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', ProductController.getProduct)

router.use(authentication)
router.post('/', authorization, ProductController.addProduct)



module.exports = router
