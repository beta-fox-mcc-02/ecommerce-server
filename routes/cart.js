const router = require('express').Router()
const CartController = require('../controllers/cartController')
const authorCostomer = require('../middlewares/authorCostomer')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', CartController.findAllCart)
router.post('/', CartController.addToCart)
router.patch('/checkout', authorCostomer, CartController.checkOut)
router.patch('/:id', authorCostomer, CartController.updateCart)
router.delete('/:id', authorCostomer, CartController.deleteCart)

module.exports = router
