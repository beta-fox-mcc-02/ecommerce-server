const express =require('express').Router()
const routes = express
const Controller = require('../Controller/ControllerCostumer')
const authentication = require('../middleware/Authentication')

routes.use(authentication)
routes.get('/Cart/user' ,Controller.findAll)
routes.post('/addCart',Controller.AddProduct)
routes.delete('/Cart/:id',Controller.deleted)
routes.put('/Cart/add',Controller.addQty)
routes.put('/Cart/min',Controller.descQty)
routes.get('/checkout/cart',Controller.checkout)

module.exports = routes