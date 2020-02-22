const router = require('express').Router();
const registerRouter = require('./register');
const loginRouter = require('./login');
const productRouter = require('./product');

router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/products', productRouter);

module.exports = router;
