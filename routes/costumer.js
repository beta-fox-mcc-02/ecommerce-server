const router = require('express').Router()
const CostumerController = require('../controllers/costumerController')
const {auth} = require('../middlewares/authentification')

router.post('/register', CostumerController.register)
router.post('/login', CostumerController.login)
router.use(auth)
router.get('/', CostumerController.data)
router.delete('/cart', CostumerController.cancelProduct)
router.get('/history', CostumerController.history)
router.get('/cart', CostumerController.cart)
router.post('/cart', CostumerController.buy)
router.post('/checkout', CostumerController.checkout)

module.exports = router