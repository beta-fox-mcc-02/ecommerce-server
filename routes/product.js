const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', ProductController.create)
router.get('/', ProductController.findAll)
router.get('/:id', authorization, ProductController.findOne)
router.put('/:id', authorization, ProductController.update)
router.delete('/:id', authorization, ProductController.delete)

module.exports = router