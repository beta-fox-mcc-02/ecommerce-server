require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
 
app.use(routes)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log('app running on port 3000');
})

module.exports = app