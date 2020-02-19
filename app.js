require('dotenv').config()

const cors = require('cors')
const express = require('express')
const app = express()

const routes = require('./routers')
const errorHandler = require('./middleware/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use(routes)
app.use(errorHandler)

module.exports = app