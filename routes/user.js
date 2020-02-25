const router = require('express').Router()
const { UserController } = require('../controllers')
const { isAuthenticated, isCustomerAuthorized } = require('../middlewares')
router.post('/login', UserController.login)
router.post('/', UserController.register)

router.use(isAuthenticated)
router.use(isCustomerAuthorized)
router.get('/', UserController.findOne)


module.exports = router