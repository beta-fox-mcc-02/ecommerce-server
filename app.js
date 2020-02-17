const express = require('express')
const app = express()
const indexRouter = require('./routes/index.js')
const errHandler = require('./middlewares/errHandler.js')

app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.use(indexRouter)
app.use(errHandler)

module.exports = app