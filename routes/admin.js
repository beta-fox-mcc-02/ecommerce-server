const router = require('express').Router()
const AdminController = require('../controllers/adminController.js')
const { authentication, authorization } = require('../middlewares/secureUserIdentificator.js')

router.get('/', authentication, AdminController.getAll)
router.post('/register', authentication, authorization, AdminController.register)
router.post('/login', AdminController.login)

module.exports = router