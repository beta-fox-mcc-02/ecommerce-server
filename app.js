if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = Number(process.env.PORT)
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.use(routes)

app.use(errorHandler)

module.exports = app