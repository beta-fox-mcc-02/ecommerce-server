const router = require('express').Router();
const ProductController = require('../controllers/products');
const authentication = require('../middlewares/authentication');
const { authorizationAdminOrMaster } = require('../middlewares/authorization');

router.get('/', ProductController.getProducts);
router.get('/:productId', ProductController.findProduct);
//middlewares
router.use(authentication, authorizationAdminOrMaster);

router.post('/', ProductController.addProduct);
router.put('/:productId', ProductController.editProduct);
router.delete('/:productId', ProductController.deleteProduct);

module.exports = router
