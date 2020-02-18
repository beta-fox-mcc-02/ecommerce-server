const router = require('express').Router();
const ProductController = require('../controllers/products');
const authentication = require('../middlewares/authentication')

router.use(authentication);
router.post('/', ProductController.addProduct);
router.put('/:productId', ProductController.editProduct)

module.exports = router