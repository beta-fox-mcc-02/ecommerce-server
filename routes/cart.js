const router = require('express').Router()
const { CartController } = require('../controllers')
const { isAuthenticated, isCartAuthorized, isCustomerAuthorized } = require('../middlewares')

router.use(isAuthenticated)
router.use(isCustomerAuthorized)
router.post('/', CartController.createCart)
router.get('/', CartController.fetchCarts)

router.use('/:id', isCartAuthorized)
router.put('/:id', CartController.updateProductInCart)
router.put('/:id/all', CartController.updateAllProductInCart)
router.get('/:id', CartController.findOneCart)
router.post('/:id/checkout', CartController.checkout)
router.delete('/:id/:detail_id', CartController.deleteProductInCart)
module.exports = router