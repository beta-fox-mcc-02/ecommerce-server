const router = require('express').Router()
const { CategoryController } = require('../controllers')
const { isAuthenticated, isAdminAuthorized } = require('../middlewares')

router.post('/', isAuthenticated, isAdminAuthorized, CategoryController.create)
router.get('/', isAuthenticated, isAdminAuthorized, CategoryController.getCategories)
router.put('/:id', isAuthenticated, isAdminAuthorized, CategoryController.update)
router.get('/:id', isAuthenticated, isAdminAuthorized, CategoryController.findCategory)
router.delete('/:id', isAuthenticated, isAdminAuthorized, CategoryController.delete)
module.exports = router