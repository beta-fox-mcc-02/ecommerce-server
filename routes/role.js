const router = require('express').Router()
const RoleController = require('../controllers/Role')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.use(authorization)
router.get('/', RoleController.findAll)
router.post('/', RoleController.create)
router.get('/:id', RoleController.findOne)
router.put('/:id', RoleController.update)
router.delete('/:id', RoleController.delete)


module.exports = router