const router = require('express').Router()
const usersRoutes = require('./users')
const productRoutes = require('./products')

router.get('/', (req, res) => {
   res.send('home')
})

router.use('/users', usersRoutes)
router.use('/products', productRoutes)

router.get('/*', (req, res) => {
   res.send('home')
})

module.exports = router