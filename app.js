if (process.env.NODE_ENV==='test' || process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const routes = require('./routes/index')
const error = require('./middlewares/error')
const cors = require('cors')

const app = express()


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())


app.use('/', routes)
app.use(error)

module.exports = app