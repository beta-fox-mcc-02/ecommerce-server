const router = require('express').Router()
const ProductController = require('../controllers/productController.js')
const {authentication} = require('../middlewares/secureUserIdentificator.js')

router.post('/', authentication, ProductController.create)
router.get('/', ProductController.findall)
router.get('/:id', ProductController.productByCategory)
router.delete('/:id', authentication, ProductController.delete)
router.put('/:id', authentication, ProductController.update)

module.exports = router