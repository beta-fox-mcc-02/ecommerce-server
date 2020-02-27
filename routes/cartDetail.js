const router = require('express').Router()
const { isAuthenticated, isCustomerAuthorized, isCartAuthorized } = require('../middlewares')
const { CartDetailController } = require('../controllers')

router.use(isAuthenticated)
router.use(isCustomerAuthorized)
router.use('/:id', isCartAuthorized)
router.put('/:id', CartDetailController.updateCartDetail)
router.delete('/:id/:detail_id', CartDetailController.deleteCartDetail)
module.exports = router