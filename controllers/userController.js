const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserController {
   static create(req, res, next) {
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
            next(err)
         })
   }

   static login(req, res, next) {  
      console.log(req.body);
      
      User.findOne({
         where: {
            email: req.body.email
         }
      })
         .then(data => {
            if (!data) {
               throw ({ code: 404, message: `Email / password wrong` })
            }
            else {
               let verified = bcrypt.compareSync(req.body.password, data.password);
               
               if (!verified) {
                  throw ({ code: 404, message: `Email / password wrong` })
               }
               else {
                  let token = jwt.sign({ id: data.id }, process.env.SECRET)
                  res.status(200).json({token, isAdmin: data.isAdmin})
               }
            }
         })
         .catch(err => {            
            next(err)
         })
   }
}

module.exports = UserController