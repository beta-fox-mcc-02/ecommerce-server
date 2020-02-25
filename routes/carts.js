const router = require('express').Router();
const CartController = require('../controllers/carts')

router.post('/', CartController.createCart)

module.exports = router;
