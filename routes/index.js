const router = require('express').Router()
const usersRoutes = require('./users')
const productRoutes = require('./products')
const categoryRoutes = require('./category')
const cartRoutes = require('./cart.js')
const roleRoutes = require('./role')

router.get('/', (req, res) => {
   res.send('home')
})

router.use('/users', usersRoutes)
router.use('/products', productRoutes)
router.use('/categories', categoryRoutes)
router.use('/carts', cartRoutes)
router.use('/roles', roleRoutes)

router.get('/*', (req, res) => {
   res.send('home')
})

module.exports = router