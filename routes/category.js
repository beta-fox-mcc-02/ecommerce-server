const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')

router.get('/', CategoryController.allCategories)
router.get('/:categoryId', CategoryController.getOneCategory)

module.exports = router