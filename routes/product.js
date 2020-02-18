const router = require('express').Router()
const ProductController = require('../controllers/productController.js')

router.post('/create', ProductController.create)
router.get('/findall', ProductController.findall)
router.delete('/delete/:id', ProductController.delete)
router.put('/update/:id', ProductController.update)

module.exports = router