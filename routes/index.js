const router = require('express').Router()
const userRoutes = require('./user')
const adminRoutes = require('./admin')

router.use('/users', userRoutes)
router.use('/admin', adminRoutes)
module.exports = router