const router = require('express').Router()
const ProductController = require('../controllers/Products')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', ProductController.findAll)
router.use(authentication)
router.use(authorization)
router.post('/', ProductController.create)
router.get('/:id', ProductController.findOne)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)


module.exports = router