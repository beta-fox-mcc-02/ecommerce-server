let { User } = require('../models')

module.exports = (req, res, next) => {
  let id = req.decoded.id

  User.findOne({where:{id}})
    .then(user=>{
      if(user.role==='admin'){
        next()
      } else {
        next({
          status :401,
          msg : 'You are not authorized'
        })
      }
    })
    .catch(err=>{
      next(err)
    })

}