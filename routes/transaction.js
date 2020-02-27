const router = require('express').Router()
const TransactionController = require('../controllers/transactionController.js')
const { authentication } = require('../middlewares/secureUserIdentificator.js')

router.get('/', authentication, TransactionController.fetchById)
router.post('/', TransactionController.checkout)
router.put('/:id', TransactionController.payment)
router.delete('/:id', TransactionController.cancel)

module.exports = router