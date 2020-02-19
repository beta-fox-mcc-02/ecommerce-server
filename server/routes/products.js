const router = require('express').Router()
const { authenticate, authorize } = require('../middlewares/auth')
const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.findAll)

router.get('/:productId', ProductController.findByPk)

//auth check
router.use(authenticate, authorize)

router.post('/', ProductController.create)

router.put('/:productId/update', ProductController.update)

router.delete('/:productId/delete', ProductController.delete)

module.exports = router
