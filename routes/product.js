const router = require('express').Router()
const ProductController = require('../controllers/productController.js')

router.post('/create', ProductController.create)
router.get('/findall', ProductController.findall)

module.exports = router