const router = require("express").Router();
const productController = require("../controllers/productController");
const images = require("../middlewares/image");
const updloadFile = require("../middlewares/uploadFile");
const authenticated = require('../middlewares/authenticated')
const authorized = require('../middlewares/authorized')

console.log(images.multer);
router.post(
  "/",
  images.multer.single("image"),
  images.sendUploadToGCS,
  productController.add
);
router.get('/', productController.getAll)
router.delete('/:id', productController.remove)
router.put('/:id', authenticated, authorized, productController.update)

module.exports = router;
