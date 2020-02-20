function errorHandler (err, req, res, next) {
   console.log(err)
   // console.log(err.error)
   // console.log(err.error, err.error.name)
   if(err.error.name === 'SequelizeValidationError') {
      let status = 400
      if(err.error.errors.length > 1) {
         let errorMessage = []
         err.error.errors.forEach(er => { 
            errorMessage.push(er.message)
         })
         console.log(errorMessage, 'error message')
         res.status(status).json({
            msg : errorMessage.join(', ')
         })
      } else {
         res.status(status).json({
            msg : err.msg
         })
      }
   } else if(err.error.name === 'JsonWebTokenError') {
      let status = 401
      res.status(status).json({
         msg : err.msg
      })
   } else if(err.error.name === 'SequelizeUniqueConstraintError') {
      // console.log(err)
      let status = 400
      res.status(status).json({
         msg : err.msg
      })
   } else if (err.error.name === 'not authorize') {
      let status = 401
      res.status(status).json({
         msg : err.msg
      })
   } else {
      res.status(err.status || 500).json({msg : err.msg || 'Internal server error' })
   }
}

module.exports = errorHandler