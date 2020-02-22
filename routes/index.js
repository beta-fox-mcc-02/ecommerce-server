const router = require('express').Router();
const peopleRouter = require('./people');
const productRouter = require('./products')

router.use('/', peopleRouter);
router.use('/products', productRouter)

module.exports = router;