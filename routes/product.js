const router = require('express').Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const author = require('../middlewares/authorization')

router.use(authentication)
router.post('/',  ProductController.create)
router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findOne)
router.put('/:id',author, ProductController.update)
router.delete('/:id',author, ProductController.delete)

module.exports = router  