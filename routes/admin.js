const router = require('express').Router()
const { AdminController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.post('/login', AdminController.login)
router.post('/', AdminController.register)
router.use(isAuthenticated)
router.get('/', AdminController.findAdmin)
module.exports = router