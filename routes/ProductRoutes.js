const express = require('express');
const router = express.Router();
const { ProductController } = require('../controllers');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');

router.use(authentication);
router.get('/', ProductController.findAll);
router.post('/', ProductController.create);
router.get('/:id', ProductController.findId);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;