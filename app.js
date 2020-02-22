if(process.env.NODE_ENV="development"){
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const routes = require('./routes')
const errorHandler =require('./middlewares/errorHandler')

const logger = require('morgan')
app.use(logger('dev'))

var cors = require('cors') 
app.use(cors())

app.use(express.json()) 
app.use(express.urlencoded({extended: false}))

app.use(routes)
app.use('/', errorHandler)

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}


module.exports = app