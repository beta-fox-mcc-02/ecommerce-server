const router = require('express').Router()
const CartController = require('../controllers/CartController')
const { checkAuth } = require('../middlewares/auth')

router.use(checkAuth)
router.post('/', CartController.create) // add cart item
router.get('/', CartController.find) // get cart items
router.get('/checkout/:id', CartController.checkout) // checkout cart to transactions
router.patch('/:id', CartController.update) // update cart item
router.delete('/:id', CartController.delete) // delete cart item

module.exports = router
