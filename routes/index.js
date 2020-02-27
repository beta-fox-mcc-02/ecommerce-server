const router = require('express').Router()
const admin = require('./admin')
const user = require('./user')
const { findAll } = require('../controllers/product')

router.get('/', findAll)
router.use('/', user)
router.use('/admin', admin)

module.exports = router