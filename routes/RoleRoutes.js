const express = require('express');
const router = express.Router();
const { RoleController } = require('../controllers');
const authentication = require('../middlewares/authentication.js');

router.use(authentication);
router.get('/', RoleController.getRole);

module.exports = router;