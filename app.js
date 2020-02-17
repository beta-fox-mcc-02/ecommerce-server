if(process.env.NODE_ENV==='development'){require('dotenv').config()}
const express = require('express')
const app = express()
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

const { User } = require('./models')
const jwt = require('./helpers/jwt')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.post('/register', (req, res, next)=>{
  const { email, password, role } = req.body
  User.create({email,password,role})
    .then(user=>{
      let payload = {
        id : user.id
      }
      let access_token = jwt.generateToken(payload)
      res.status(201).json({access_token})
    })
    .catch(err=>{
      next(err)
    })
})

app.use(errorHandler)

module.exports = app