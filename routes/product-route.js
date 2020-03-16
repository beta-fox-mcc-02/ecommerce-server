const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product-controller');
const authentication = require('../middlewares/authentication');

router.get('/product', ProductController.findAll);
router.use(authentication.authentication);
router.post('/product', authentication.authorization, ProductController.create);
router.delete('/product/:id', authentication.authorization, ProductController.delete);
router.patch('/product/:id', authentication.authorization, ProductController.update);


module.exports = router;