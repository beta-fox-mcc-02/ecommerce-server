const router = require('express').Router()
const UserController = require('../controllers/Users')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
// router.use(authentication)
// router.use(authorization)
router.get('/', authentication, authorization, UserController.findAll)
router.get('/:id', UserController.getProfile)
router.put('/:id', UserController.editProfile)

module.exports = router