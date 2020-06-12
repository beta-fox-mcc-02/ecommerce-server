const router = require('express').Router()
const categoryController = require('../controllers/categoryController')

router.get('/category', categoryController.findAll)

router.post('/category', categoryController.create)

router.get('/category/:id', categoryController.findOne)

router.put('/category/:id', categoryController.update)

router.delete('/category/:id', categoryController.delete)

module.exports = router