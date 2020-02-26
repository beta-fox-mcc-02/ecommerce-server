const router = require('express').Router()
const CartController = require('../controllers/Cart')
const CartDetailController = require('../controllers/CartDetail')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', CartDetailController.findAll)
router.post('/', CartDetailController.addToCart)
router.use(authorization)
router.delete('/:id', CartDetailController.delete)

module.exports = router