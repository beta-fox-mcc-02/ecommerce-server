const router = require('express').Router();
const CartController = require('../controllers/carts');
const authentication = require('../middlewares/authentication');

router.get('/:personId/:productId', CartController.findCart);
router.use(authentication);
router.post('/', CartController.createCart);
router.put('/:personId/:productId', CartController.editCart);
router.delete('/:personId/:productId', CartController.deleteCart);
router.put('/:personId/:productId/checkout', CartController.checkoutCart);

module.exports = router;
