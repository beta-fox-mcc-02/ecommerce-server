const router = require('express').Router()
const Controller = require('../controllers/adminController')

router.post('/register', Controller.register)

module.exports = router