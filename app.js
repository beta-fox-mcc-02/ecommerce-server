if(process.env.NODE_ENV==='development'){require('dotenv').config()}
const express = require('express')
const app = express()
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes')

const { User } = require('./models')
const jwt = require('./helpers/jwt')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/', router)

app.use(errorHandler)

module.exports = app