const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')
const customerAuthorization = require('../middlewares/customerAuthorization')

router.post('/', authentication, cartController.create)
router.get('/', authentication, cartController.getAllCart)
router.put('/:cartId', authentication, customerAuthorization, cartController.updateStock)
router.put('/checkout/:cartId', authentication, customerAuthorization, cartController.updateStatus) //mengurangi stock product juga
router.delete('/:cartId', authentication, customerAuthorization, cartController.delete)

module.exports = router