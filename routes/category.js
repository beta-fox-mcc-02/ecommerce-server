const router = require('express').Router()
const { CategoryController } = require('../controllers')
const { isAuthenticated, isAdminAuthorized } = require('../middlewares')

router.get('/', CategoryController.getCategories)
router.get('/:id', CategoryController.findCategory)

router.use(isAuthenticated)
router.use(isAdminAuthorized)
router.post('/', CategoryController.create)
router.put('/:id', CategoryController.update)
router.delete('/:id', CategoryController.delete)
module.exports = router