const jwt = require ('jsonwebtoken')

module.exports = (req, res, next) => {
   try {
      const token = req.headers.token
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