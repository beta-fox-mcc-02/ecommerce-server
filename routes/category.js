const router = require('express').Router()
const CategoryController = require('../controllers/categoryController.js')

router.get('/findall', CategoryController.findAll)

module.exports = router