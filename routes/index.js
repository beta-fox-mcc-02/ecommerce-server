const router = require('express').Router()
const UserRoutes = require('./user')

router.use(UserRoutes)

module.exports = router