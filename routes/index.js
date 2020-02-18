const router = require('express').Router()
const userRoutes = require('./user')
const adminRoutes = require('./admin')
const categoryRoutes = require('./category')

router.use('/users', userRoutes)
router.use('/admin', adminRoutes)
router.use('/categories', categoryRoutes)
module.exports = router