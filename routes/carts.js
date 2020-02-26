const router = require('express').Router();
const CartController = require('../controllers/carts');
const authentication = require('../middlewares/authentication');

router.get('/:personId/:productId', CartController.findCart);
router.use(authentication);
router.post('/', CartController.createCart);
router.put('/:personId/:productId', CartController.editCart);

module.exports = router;
