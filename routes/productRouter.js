const express = require ('express')
const router = express.Router()
const productController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const adminAuthorization = require ('../middlewares/adminAuthorization')

router.post('/', authentication, adminAuthorization, productController.create)

module.exports = router