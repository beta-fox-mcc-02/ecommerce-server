const router = require('express').Router()
const { findAll ,addCart, checkOutCart, updateAmount, deleteOneCart } = require('../../controllers/cart')
const authentication = require('../../middlewares/authentication')

router.use(authentication)

router.get('/cart', findAll)
router.post('/:id', addCart)
router.put('/cart', checkOutCart)
router.put('/cart/:id', updateAmount)
router.delete('/cart/:id', deleteOneCart)

module.exports = router