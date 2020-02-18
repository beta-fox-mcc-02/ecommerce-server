const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);
router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);
router.post('/', authorization, ProductController.create);


module.exports = router;