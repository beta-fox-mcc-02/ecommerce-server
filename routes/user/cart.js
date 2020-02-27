const router = require('express').Router()
const { findAll ,addCart, checkOutCart } = require('../../controllers/cart')
const authentication = require('../../middlewares/authentication')

router.use(authentication)

router.get('/cart', findAll)
router.post('/:id', addCart)
router.put('/cart', checkOutCart)

module.exports = router