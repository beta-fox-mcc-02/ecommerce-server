const router = require('express').Router()
const admin = require('./admin')
const error = require('../middlewares/errorHandler')

router.use('/admin', admin)
router.use(error)

module.exports = router