const router = require('express').Router()
const CategoryController = require('../controllers/Category')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.use(authorization)
router.get('/', CategoryController.findAll)
router.post('/', CategoryController.create)
router.get('/:id', CategoryController.findOne)
router.put('/:id', CategoryController.update)
router.delete('/:id', CategoryController.delete)


module.exports = router
