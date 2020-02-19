const router = require('express').Router()
const ProductController = require('../controllers/productController')
const {auth} = require('../middlewares/authentification')
const {check} = require('../middlewares/authorization')

router.get('/list', ProductController.productList)
router.get('/:id/item', ProductController.productById)
router.use(auth)
router.post('/list', check, ProductController.add)
router.put('/:id/item', check, ProductController.update)
router.delete('/:id/item', check, ProductController.delete)

module.exports = router