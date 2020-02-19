const router = require('express').Router()
const ProductController = require('../controllers/productController.js')

router.post('/', ProductController.create)
router.get('/', ProductController.findall)
router.delete('/:id', ProductController.delete)
router.get('/:id', ProductController.findOne)
router.put('/:id', ProductController.update)

module.exports = router