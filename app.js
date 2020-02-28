require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
        
app.use(routes)
app.use(errorHandler)

module.exports = app