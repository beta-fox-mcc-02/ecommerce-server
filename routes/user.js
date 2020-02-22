const express =require('express').Router()
const routes = express
const Controller = require("../Controller/ControllerUser")

routes.post('/register',Controller.register)
routes.post('/admin/register',Controller.registerAdmin)
routes.post('/login',Controller.login)


module.exports = routes