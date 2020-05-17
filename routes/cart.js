const router = require('express').Router()
const cartController = require('../controllers/cartController.js')
const {
    authentication
} = require('../middlewares/authentication.js')
const {
    authorize
} = require('../middlewares/authorize.js')

router.use(authentication)

router.get('/cart', cartController.findAll)

router.get('/history', cartController.findHistory)

router.post('/cart', cartController.create)

router.get('/cart/:id', cartController.findOne)

router.put('/cart/update/:id', cartController.update)

router.put('/cart/checkout/:id', cartController.checkout)

router.delete('/cart/:id', authorize, cartController.delete)

module.exports = router