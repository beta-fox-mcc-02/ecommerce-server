const router = require('express').Router()
const { isAdminAuthorized, uploadImage, isAuthenticated } = require('../middlewares')
const { ProductImageController } = require('../controllers')

router.use(isAuthenticated)
router.use(isAdminAuthorized)
router.post('/', uploadImage, ProductImageController.addProductImage)
router.put('/:id', uploadImage, ProductImageController.updateProductImage)
router.delete('/:id', ProductImageController.deleteProductImage)

module.exports = router