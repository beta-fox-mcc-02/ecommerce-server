const router = require('express').Router()
const CartController = require('../controllers/Cart')
const CartDetailController = require('../controllers/CartDetail')
const authentication = require('../middlewares/authentication')
const authorizationUser = require('../middlewares/authorizationUser')

router.use(authentication)
router.get('/', CartDetailController.findAll)
router.post('/', CartDetailController.addToCart)
// router.use(authorizationUser)
router.put('/:id', authorizationUser, CartDetailController.updateCart)
router.delete('/:id', authorizationUser, CartDetailController.delete)
router.put('/:cartId/checkout', CartDetailController.checkOut)

module.exports = router