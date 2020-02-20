const express = require('express')
const app = express()
const indexRouter = require('./routes/index.js')
const errHandler = require('./middlewares/errHandler.js')
const cors = require('cors')

const corsOptions = {
  origin: 'https://ecommerce-cmsv1.firebaseapp.com',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: true,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.use(indexRouter)
app.use(errHandler)

module.exports = app