const router = require('express').Router();
const ProductController = require('../controllers/products');
const authentication = require('../middlewares/authentication');

router.get('/', ProductController.getProducts)
router.use(authentication);
router.post('/', ProductController.addProduct);
router.put('/:productId', ProductController.editProduct);
router.delete('/:productId', ProductController.deleteProduct);

module.exports = router