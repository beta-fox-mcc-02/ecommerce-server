require('dotenv').config()
const express = require('express')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)

app.use((err, req, res, next) => {
    let statusCode = 500
    let msg = { msg: 'Internal Server Error' }

    if (err.name === 'SequelizeValidationError') {
        const errors = []
        err.errors.forEach(error => {
            errors.push(error.message)
        })
        msg = {
            msg: 'Bad Request',
            errors
        }
        statusCode = 400
    } else if (err.name === 'wrongauth') {
        msg = {
            msg: 'email / password not correct'
        }
        statusCode = 401
    } else if (err.name === 'productNotFound') {
        msg = {
            msg: 'product not found'
        }
        statusCode = 404
    }

    res.status(statusCode).json(msg)

})

module.exports = app
