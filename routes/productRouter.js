const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.post('/', authorization, ProductController.createProduct)
router.get('/', ProductController.fetchAll)
router.get('/:id', ProductController.fetchOne)
router.put('/:id', authorization, ProductController.updateProduct)
router.delete('/:id', authorization, ProductController.deleteProduct)

module.exports = router