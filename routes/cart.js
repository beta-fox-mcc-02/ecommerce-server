const router = require('express').Router();
const CartController = require('../controllers/CartController');
const authentication = require('../middlewares/authentication');

router.use(authentication);
router.get('/', CartController.findCurrentItems);
router.get('/history', CartController.history);


module.exports = router;