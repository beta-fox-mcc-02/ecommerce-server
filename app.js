require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000


const routes = require('./routes/index')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(routes)



module.exports = app