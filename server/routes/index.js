const router = require('express').Router()

// router.post('/login', require('../controllers/UserController').login)
router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/categories', require('./categories'))
router.use('/', (req, res) => res.render("HELLO, FANCY MEETING YOU HERE!!!"))

module.exports = router