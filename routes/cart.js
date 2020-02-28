const express = require('express')
const CartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')

const router = express.Router()

router.post('/', authentication, CartController.addToCart)
router.get('/', authentication, CartController.fetchCart)
router.delete('/:id', authentication, CartController.destroy)
router.put('/:id', authentication, CartController.update)
router.post('/:id', authentication, CartController.payment)

module.exports = router