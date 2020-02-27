const router = require('express').Router()
const OrderController = require('../controllers/OrderController')
const { checkAuth } = require('../middlewares/auth')

router.use(checkAuth)
router.get('/', OrderController.find) // get order items
router.get('/:id', OrderController.findById) // get order details
module.exports = router
