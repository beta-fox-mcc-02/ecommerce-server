const express = require('express')
const app = express()
const indexRouter = require('./routes/index.js')
const errHandler = require('./middlewares/errHandler.js')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send(`audasdbasudasudasudas`)
})

// app.use(indexRouter)
app.use(errHandler)

module.exports = app