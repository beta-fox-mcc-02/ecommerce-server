const express =require('express').Router()
const routes = express
const user = require('./user')
const product = require('./product')

routes.use(user)
routes.use(product)

module.exports = routes