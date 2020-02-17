const { User } = require('../models')
const jwt = require('jsonwebtoken')

class UserController {
   static create (req, res, next) {
      let newUser = {
         name: req.body.name,
         email: req.body.email,
         password: req.body.password
      }

      User.create(newUser)
         .then(data => {
            res.status(201).json(data)
         })
         .catch(err => {
            res.status(500).json({msg: `jancok`})
         })
   }
}

module.exports = UserController