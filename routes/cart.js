const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cart')

router.post('/', CartController.create)
router.get('/view/:cartId', CartController.findOne)
router.get('/:id', CartController.findAll)
router.put('/:id', CartController.update)
router.delete('/:id', CartController.delete)

module.exports = router