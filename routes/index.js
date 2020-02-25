const router = require('express').Router();
const peopleRouter = require('./people');
const productRouter = require('./products');
const cartRouter = require('./carts');

router.use('/', peopleRouter);
router.use('/products', productRouter)
router.use('/carts', cartRouter)

module.exports = router;
