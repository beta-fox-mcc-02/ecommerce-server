const express = require('express')
const router = express.Router()
const CartController = require('../controllers/CartController')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', CartController.viewCart)
router.post('/', CartController.addToCart)

module.exports = router