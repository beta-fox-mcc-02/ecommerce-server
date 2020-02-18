const { User } = require('../models')
const { JwtHelper, BcryptHelper } = require('../helpers/index')

class UserController {
   static register (req, res) {
      let { name, email, password, RoleId } = req.body
      let input = { name, email, password, RoleId }
      User.create(input)
         .then(user => {
            // console.log(user, '=====================')
            res.status(201).json({
               name: user.name,
               email: user.email,
               password: user.password,
               RoleId : user.RoleId
            })
         })
         .catch(err => {
            // console.log(err)
            res.status(400).json({
               err,
               msg: 'error register user'
            })
         })
   }

   static login (req, res) {
      let { email, password } = req.body
      User.findOne({
         where : {
            email
         }
      })
         .then(user => {
            if(user) {
               console.log('then login user')
               let valid = BcryptHelper.decryptPass(password, user.password)
               if(valid) {
                  console.log('then valid login')
                  const token = JwtHelper.generateToken({ id: user.id, email})
                  res.status(200).json({
                     access_token : token,
                     msg : 'login success'
                  })
               } else {
                  res.status(400).json({
                     err : {
                        name : 'BAD REQUEST'
                     },
                     msg : 'wrong username/password'
                  })
               }
            } else {
               res.status(400).json({
                  err : {
                     name : 'BAD REQUEST'
                  },
                  msg : 'wrong username/password'
               })
            }
         })
         .catch(err => {
            res.status(400).json({
               err,
               msg: 'wrong username/password'
            })
         })
   }
}


module.exports = UserController