const router = require('express').Router()
const user = require('./user')
const cart = require('./cart')

router.use('/user', user)
router.use('/', cart)

module.exports = router