if (process.env.NODE_ENV==='test') {
    require('dotenv').config()
}

const express = require('express')
const routes = require('./routes/index')
const error = require('./middlewares/error')

const app = express()
const port = process.env.PORT || 3000 

app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use('/', routes)
app.use(error)


app.listen(port, () =>{
    console.log('connected on port ' + port)
})

module.exports = app