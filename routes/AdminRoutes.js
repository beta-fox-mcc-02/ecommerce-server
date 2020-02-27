const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers');

router.post('/register', UserController.createAdmin);
router.post('/login', UserController.loginAdmin);

module.exports = router;