const router = require('express').Router()
const userAuthorization = require('../middlewares/userAuthorization')
const CartController = require('../controllers/cartController')

router.use(userAuthorization)
router.get('/', CartController.productsInCart)
router.delete('/', CartController.deleteAllFromCart)
router.put('/:cartId', CartController.changeQuantity)
router.delete('/:cartId', CartController.deleteFromCart)
router.get('/checkout', CartController.checkout)
router.post('/:productId', CartController.addCart)

module.exports = router