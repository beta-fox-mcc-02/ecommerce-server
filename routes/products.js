const router = require('express').Router();
const ProductController = require('../controllers/products');

router.post('/', ProductController.addProduct)

module.exports = router