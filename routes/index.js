const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
const ProductRouter = require('./product')
const RoleController = require('../controllers/role')
const errorHandler = require('../middlewares/errorHandler')

router.post('/registerCostumer', UserController.registerCostumer )
router.post('/registerAdmin', UserController.registerAdmin )
router.post('/login', UserController.login)
router.use('/products', ProductRouter )
router.get('/roles', RoleController.findAll)
router.use(errorHandler)


module.exports = router