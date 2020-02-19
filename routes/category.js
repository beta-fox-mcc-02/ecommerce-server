const router = require('express').Router()
const CategoryController = require('../controllers/categoryController.js')

router.get('/', CategoryController.findAll)

module.exports = router