const router = require('express').Router()
const TransactionController = require('../controllers/transactionController.js')

router.post('/', TransactionController.checkout)

module.exports = router