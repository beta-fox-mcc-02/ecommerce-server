const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) { 
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage })

router.post('/', upload.single('image'), ProductController.create)
router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findOne)
router.put('/:id', ProductController.update)
router.patch('/:id', upload.single('image'),ProductController.updateImage)
router.delete('/:id', ProductController.delete)

module.exports = router
