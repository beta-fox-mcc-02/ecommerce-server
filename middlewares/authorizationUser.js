const { CartDetail } = require('../models')

module.exports = (req, res, next) => {
  let RoleId = +req.RoleId
  let id = +req.params.id
  console.log(id, RoleId)
  // console.log(RoleId, '========================')
   if(RoleId === 1) {
      //admin
      next()
   } else if (RoleId === 2) {
     CartDetail.findOne({
       where: { id }
     })
      .then(data => {
        console.log(data)
      })
      .catch(() => {
        console.log({error: err})
      })
   } else {
      //user-not authorize
      next({
         error : {
            name : 'not authorize'
         },
         status: 401,
         msg : "you are not authorize"
      })
   }
}