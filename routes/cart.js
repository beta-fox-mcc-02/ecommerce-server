const router = require('express').Router()
const { CartController } = require('../controllers')
const { isAuthenticated, isCartAuthorized, isCustomerAuthorized } = require('../middlewares')

router.use(isAuthenticated)
router.use(isCustomerAuthorized)
router.post('/', CartController.createCart)

router.use('/:id', isCartAuthorized)
router.put('/:id', CartController.updateCart)
module.exports = router