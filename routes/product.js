const express =require('express').Router()
const routes = express
const Controller = require("../Controller/ControllerProduct")
const authentication = require('../middleware/Authentication')


routes.use(authentication)
routes.get('/',Controller.readAll)
routes.get('/:id',Controller.findOne)
routes.post('/create',Controller.create)
routes.delete('/:id',Controller.delete)
routes.put('/:id',Controller.update)


module.exports = routes