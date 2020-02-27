const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cartController')
const authentication = require('../middleware/authentication')
const authorizationCart = require('../middleware/authorizationCart')

router.use(authentication)
router.get('/', CartController.getAllCart)
router.post('/', CartController.createCart)
router.put('/:id', authorizationCart, CartController.editCart)
router.delete('/:id', authorizationCart, CartController.delete)

module.exports = router