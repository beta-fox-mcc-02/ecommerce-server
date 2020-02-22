const express = require ('express')
const router = express.Router()
const productController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const adminAuthorization = require ('../middlewares/adminAuthorization')
let images = require('../middlewares/images')

router.post('/', authentication, adminAuthorization, images.multer.single('image_url'), images.sendUploadToGCS, productController.create)
// router.post('/', authentication, adminAuthorization, productController.create)
router.get('/', authentication, productController.getAll)
router.get('/:productId', authentication, productController.getOne)
router.put('/:productId', authentication, adminAuthorization, images.multer.single('image_url'), images.sendUploadToGCS, productController.update)
router.delete('/:productId', authentication, adminAuthorization, productController.delete)

module.exports = router