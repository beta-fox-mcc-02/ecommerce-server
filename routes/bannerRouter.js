const router = require('express').Router()
const bannerController = require('../controllers/bannerController')
const images = require("../middlewares/image");

router.get('/', bannerController.getAll)
router.post('/',  images.multer.single("image"),
images.sendUploadToGCS, bannerController.add)
router.delete('/:id', bannerController.remove)

module.exports = router;
