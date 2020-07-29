const express =require('express').Router()
const routes = express
const user = require('./user')
const product = require('./product')
const cart = require('./cart')

routes.use(user)
routes.use(product)
routes.use(cart)

module.exports = routes