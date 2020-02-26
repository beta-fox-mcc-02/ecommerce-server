const router = require('express').Router();
const CartController = require('../controllers/carts');
const authentication = require('../middlewares/authentication');

router.post('/', authentication, CartController.createCart);
router.get('/:personId/:productId', CartController.findCart);

module.exports = router;
