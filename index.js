require('dotenv').config()
const express = require('express')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)

app.use((err, req, res, next) => {
    console.log(err)
    const { start, httpStatus, message, previousError, stack } = err
    console.log(stack)

    res.status(httpStatus || 406).json({
        status: false,
        code: httpStatus || 406,
        message,
        data: previousError
    })
})

module.exports = app
