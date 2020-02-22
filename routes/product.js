const router = require('express').Router()
const ProductController = require('../controllers/productController.js')
const {authentication} = require('../middlewares/secureUserIdentificator.js')

router.use(authentication)
router.post('/', ProductController.create)
router.get('/', ProductController.findall)
router.delete('/:id', ProductController.delete)
router.put('/:id', ProductController.update)

module.exports = router