const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers');

router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);

module.exports = router;