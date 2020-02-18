const express = require ('express')
const router = express.Router()
const productController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const adminAuthorization = require ('../middlewares/adminAuthorization')

router.post('/', authentication, adminAuthorization, productController.create)
router.get('/', authentication, productController.getAll)
router.put('/:productId', authentication, adminAuthorization, productController.update)
router.delete('/:productId', authentication, adminAuthorization, productController.delete)
module.exports = router