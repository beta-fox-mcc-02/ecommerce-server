const router = require('express').Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const author = require('../middlewares/authorization')

router.get('/', ProductController.findAll)
router.use(authentication)
router.post('/', author, ProductController.create)
router.get('/:id', author, ProductController.findOne)
router.put('/:id', author, ProductController.update)
router.delete('/:id', author, ProductController.delete)

module.exports = router  
