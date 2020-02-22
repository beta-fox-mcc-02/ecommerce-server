const router = require('express').Router()
const ProductController = require('../controllers/productController')
const adminAuthorization = require('../middlewares/adminAuthorization')

router.use(adminAuthorization)
router.post('/', ProductController.newProduct)
router.put('/:productId', ProductController.updateProduct)
router.delete('/:productId', ProductController.deleteProduct)

module.exports = router