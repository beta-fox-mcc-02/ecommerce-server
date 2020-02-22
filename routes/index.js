const router = require('express').Router()
const UserRoutes = require('./user')
const ProductRoutes = require('./product')
const CategoryRoutes = require('./category')

router.use(UserRoutes)
router.use('/products', ProductRoutes)
router.use('/categories', CategoryRoutes)

module.exports = router