const router = require('express').Router();
const CartController = require('../controllers/CartController');
const authentication = require('../middlewares/authentication');
const customerAuthorization = require('../middlewares/customerAuthorization');

router.use(authentication);

// based on user id (token)
router.get('/', CartController.findCurrentItems);
router.get('/history', CartController.history);

// based on cartId and productId
router.post('/:id/:productId', customerAuthorization, CartController.create);
// router.put('/:id/:productId', customerAuthorization, CartController.update);
// router.delete('/:id/:productId', customerAuthorization, CartController.delete);


module.exports = router;