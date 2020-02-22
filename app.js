if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') require('dotenv').config()

const express = require('express')
const cors = require('cors')
const errHandler = require('./middlewares/errHandlers')
const app = express()

//middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

//router
// app.post('/login', (req, res) => {
//   res.satatus(200).json(req.body)
// })
app.use('/', require('./routes'))
app.use(errHandler)

module.exports = app