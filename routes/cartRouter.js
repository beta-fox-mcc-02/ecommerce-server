const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cartController')
const authentication = require('../middleware/authentication')

router.use(authentication)
router.get('/', CartController.getAllCart)
router.post('/', CartController.createCart)

module.exports = router