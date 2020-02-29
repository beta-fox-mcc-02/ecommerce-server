const router = require('express').Router();
const peopleRouter = require('./people');
const productRouter = require('./products');
const cartRouter = require('./carts');

router.get('/', (req, res) => {
  res.send('hello world');
});
router.use('/', peopleRouter);
router.use('/products', productRouter)
router.use('/carts', cartRouter)

module.exports = router;
