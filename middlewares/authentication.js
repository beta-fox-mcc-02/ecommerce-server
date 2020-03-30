const { User } = require('../models')
const { JwtHelper } = require('../helpers/index')

module.exports = (req, res, next) => {
   let token = req.headers.access_token
   let userToken = req.headers.access_token_user
  //  console.log(token, '===')
  //  console.log(userToken, '====')
   if(token) {
      try {
         const payload = JwtHelper.verifyToken(token)
         console.log(payload, '===payloa===')
         User.findOne({
            where : {
               email : payload.email
            }
         })
            .then(user => {
               if(user) {
                  req.currentUserId = payload.id
                  req.RoleId = payload.RoleId
                  // console.log(req.RoleId, req.currentUserId, '=Authentication=')
                  next()
               } else {
                  next({
                     name: 'User not found',
                     status: 400,    
                     msg: 'please log in first'
                  })
               }
            })
            .catch(err => {
               next({
                  err,
                  status: 400,
                  msg : 'please log in first'
               })
            })
      }
      catch(err) {
         next({
            err,
            status: 400,
            msg : 'please log in first'
         })
      }
   } else {
      next({
         name : 'you are not authenticate',
         status: 400,    
         msg: 'please log in first'
      })
   }
}
