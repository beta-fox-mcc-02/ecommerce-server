const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')

router.get('/', CategoryController.findAll)

router.get('/:categoryId', CategoryController.findByPk)

module.exports = router