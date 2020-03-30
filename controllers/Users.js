const { User } = require('../models')
const { JwtHelper, BcryptHelper } = require('../helpers/index')

class UserController {
   static register (req, res, next) {
      let { name, email, password, RoleId } = req.body
      let input = { name, email, password, RoleId }
      User.create(input, { returning : true })
         .then(user => {
            const token = JwtHelper.generateToken({ id: user.id, email, RoleId})
            // localStorage.token = token
            res.status(201).json({
               access_token : token,
               data: {
                 id: user.id,
                 email: user.email
               },
               msg : 'success register'
            })
         })
         .catch(next)
   }

   static login (req, res, next) {
      let { email, password } = req.body
      User.findOne({ where : { email } })
         .then(user => {
          //  console.log('masuk sini ============')
            if(user) {
              //  console.log('then login user')
               let valid = BcryptHelper.decryptPass(password, user.password)
               if(valid) {
                  // console.log('then valid login')
                  const token = JwtHelper.generateToken({ id: user.id, email, RoleId: user.RoleId})
                  // localStorage.token = token
                  res.status(200).json({
                     access_token : token,
                     data: user,
                     msg : 'login success'
                  })
               } else {
                  next({
                     name : 'BadRequestAuthentication',
                     status : 400,
                     msg : 'wrong username/password'
                  })
               }
            } else {
               next({
                  name : 'BadRequestAuthentication',
                  status : 400,
                  msg : 'wrong username/password'
               })
            }
         })
         .catch(next)
   }

   static findAll (req, res, next) {
     User.findAll({
       order: [['id', 'asc']]
     }) 
       .then(users => {
        //  console.log(users)
         if(users.length === 0) {
           res.status(200).json({
             data: [{
               id: null,
               name: 'N/A',
               email: 'N/A'
             }],
             msg: 'data not found'
           })
         } else {
           res.status(200).json({
             data: users,
             msg: 'success get all user'
           })
         }
       })
       .catch(err => {
         next({
           error: err,
           msg: 'You are not authorize'
         })
       })
   }

   static getProfile (req, res, next) {
    let id = +req.params.id
   //  console.log(id)
    User.findOne({
      where: { id }
    })
     .then(user => {
       // console.log(user)
       res.status(200).json({
         data: {
           id: user.id,
           name: user.name,
           email: user.email
         }
       })
     })
     .catch(next)
  }

  static editProfile (req, res, next) {
    let id = +req.params.id
    // console.log(req.body)
    let { name, email } = req.body
    let input = { name, email }
    User.update(input, {
      where : { id }
    })
      .then(user => {
        // console.log(user)
        if(user[0]) {
          res.status(200).json({
            msg: 'success update user'
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}


module.exports = UserController