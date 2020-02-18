const express = require('express')
const router = express.Router()
const userRoutes = require('./usersRouter')
const adminRoutes = require('./admisRouter')
const productRoutes = require('../routes/productRouter')

router.get('/', (req, res) => {
    res.send('WELCOME')
})
router.use('/users', userRoutes)
router.use('/admins', adminRoutes)
router.use('/products', productRoutes)

module.exports = router