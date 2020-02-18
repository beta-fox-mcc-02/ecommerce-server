const router = require('express').Router()
const ProductController = require('../controllers/productController')
const {auth} = require('../middlewares/authentification')

router.get('/list', ProductController.productList)
router.get('/:id/item', ProductController.productById)
router.use(auth)
router.post('/list', ProductController.add)
router.put('/list', ProductController.update)
router.delete('/list', ProductController.delete)

module.exports = router