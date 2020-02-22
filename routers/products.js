const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.get('/', ProductController.getProducts)
router.post('/', authentication, ProductController.addNewProduct)
router.get('/:id', authentication, ProductController.getById)
router.put('/:id', authentication, authorization, ProductController.updateItem)
router.delete('/:id', authentication, authorization, ProductController.removeItem)

module.exports = router