const router = require('express').Router()
const { ProductController } = require('../controllers')
const { isAuthenticated, isAdminAuthorized, uploadImage } = require('../middlewares')

router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.findOneProduct)
router.use(isAuthenticated)
router.use(isAdminAuthorized)
router.post('/', uploadImage, ProductController.addProduct)
router.put('/:id', uploadImage, ProductController.editProduct)
router.delete('/:id', ProductController.deleteProduct)
module.exports = router