module.exports = (req, res, next) => {
  let RoleId = +req.RoleId
  // console.log(RoleId, '========================')
   if(RoleId === 1) {
      //admin
      next()
   } else {
      //user-gagal
      next({
         error : {
            name : 'not authorize'
         },
         status: 401,
         msg : "you are not authorize"
      })
   }
}
