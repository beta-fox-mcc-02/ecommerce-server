function errorHandler (err, req, res, next) {
    // console.log(err, '================')
    let status = 500
    if (err.name === 'SequelizeUniqueConstraintError') {
      // console.log(err.error, '==================')
      // console.log('===== ERROR SEQUELIZE UNIQUE CONSTRAINT =====')
      res.status(400).json({
        msg: err.errors
      })
    } else if (err.name === 'SequelizeValidationError') {
      // console.log('ERROR SEQUELIZE VALIDATION ERROR')
      res.status(400).json({
        msg: err.errors
      })
    } else if (err.name === 'BadRequestAuthentication') {
      // console.log('ERROR SEQUELIZE IN INPUT')
      res.status(400).json({
        msg: err.msg
      })
    } else {
      // console.log('ERROR FROM OTHER METHODS')
      res.status(err.status || 500).json({ msg : err.msg || 'Internal server error' })
    }
   // console.log(err.error)
   // console.log(err.error, err.error.name)
   if(err.err.name === 'JsonWebTokenError') {
    // console.log('ERROR JSON WEB TOKEN ERROR')
      res.status(401).json({
         msg : err.msg
      })
   } else if (err.err.name === 'not authorize') {
      // console.log('ERROR NOT AUTHORIZE')
      let status = 401
      res.status(status).json({
         msg : err.msg
      })
   }
}

module.exports = errorHandler