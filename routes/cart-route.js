const express = require('express');
const router = express.Router();
const CartController = require('../controllers/transaction-controller');
const authentication = require('../middlewares/authentication');

router.use(authentication.authentication);
router.get('/cart', CartController.currentItem);
router.post('/cart', authentication.authorization, CartController.create);
// router.delete('/product/:id', authentication.authorization, ProductController.delete);
// router.patch('/product/:id', authentication.authorization, ProductController.update);


module.exports = router;