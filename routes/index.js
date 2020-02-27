const router = require('express').Router();
const registerRouter = require('./register');
const loginRouter = require('./login');
const productRouter = require('./product');
const cartRouter = require('./cart');

router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/products', productRouter);
router.use('/carts', cartRouter);

module.exports = router;
