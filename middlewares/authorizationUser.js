const { CartDetail, Cart } = require('../models')

module.exports = (req, res, next) => {
  let RoleId = +req.RoleId
  let id = +req.params.id
  console.log(id, RoleId, req.currentUserId)
  // console.log(RoleId, '========================')
   if(RoleId === 1) {
      //admin
      next()
   } else if (RoleId === 2) {
     CartDetail.findOne({
       where: { id },
       include: [Cart]
     })
      .then(data => {
        if (data.Cart.UserId === req.currentUserId) {
          next()
        } else {
          next({
            error : {
              name : 'not authorize'
           },
           status: 401,
           msg : "you are not authorize"
          })
        }
      })
      .catch(next)
   } else {
      //user-not authorize
      next({
         error : { name : 'not authorize' },
         status: 401,
         msg : "you are not authorize"
      })
   }
}