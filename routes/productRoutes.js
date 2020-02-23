const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', ProductController.create)
router.get('/', ProductController.read)
router.put('/:id', authorization, ProductController.update)
router.delete('/:id', authorization, ProductController.delete)


module.exports = router