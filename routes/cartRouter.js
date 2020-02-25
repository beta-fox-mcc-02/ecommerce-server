const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')
const customerAuthorization = require('../middlewares/customerAuthorization')

router.post('/', authentication, cartController.create)
router.get('/', authentication, cartController.getAllCart)

module.exports = router