const express = require('express')
const CartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')

const router = express.Router()

router.post('/', authentication, CartController.addToCart)
router.get('/', authentication, CartController.fetchCart)

module.exports = router