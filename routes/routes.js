const express = require('express');
const router = express.Router();

const ProductRoutes = require('./ProductRoutes.js');
const RoleRoutes = require('./RoleRoutes.js');
const UserRoutes = require('./UserRoutes.js');

router.use('/product', ProductRoutes);
router.use('/roles', RoleRoutes);
router.use('/admin', UserRoutes);

module.exports = router;