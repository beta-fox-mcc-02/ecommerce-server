const express = require('express')
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

const router = express.Router()

router.post('/', authentication, authorization, ProductController.addProduct)
router.get('/', ProductController.readProduct)
router.put('/:id', authentication, authorization, ProductController.updateProduct)
router.get('/:id', authentication, authorization, ProductController.findByPk)
router.delete('/:id', authentication, authorization, ProductController.deleteProduct)


module.exports = router