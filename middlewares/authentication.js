const jwt = require ('jsonwebtoken')

module.exports = (err, req, res, next) => {
   const token = req.headers.token
   try {
      let decoded = jwt.verify(token, process.env.SECRET)
      if (decoded) {
         req.currentUserId = decoded.id
         next()
      }
   }
   catch (err) {
      next(err)
   }
}