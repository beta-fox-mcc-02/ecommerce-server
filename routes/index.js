const express = require('express')
const router = express.Router()
const ProductRouter = require('./product')
const CartRouter = require('./cart')
const UserController = require('../controllers/user')
const RoleController = require('../controllers/role')
const CostumersController = require('../controllers/costumer')
const errorHandler = require('../middlewares/errorHandler')


// COSTUMERS =====================================
router.post('/register', CostumersController.register)
router.post('/login', CostumersController.login)


//ADMIN ==========================================
router.post('/registerAdmin', UserController.registerAdmin )
router.post('/loginAdmin', UserController.login)

//CART ===========================================
router.use('/cart', CartRouter)

// PRODUCT =======================================
router.use('/products', ProductRouter )
router.get('/roles', RoleController.findAll)


// ERROR HANDLER =================================s
router.use(errorHandler)


module.exports = router