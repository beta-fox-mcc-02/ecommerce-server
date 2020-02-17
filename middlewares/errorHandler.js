module.exports = (err, req, res, next) => {
   // console.log(err, `ini di error handlerrrrrrrrrrrrrrrrrrrr`);

   let status = 500
   let msg = err.message

   if (err.name === 'SequelizeUniqueConstraintError') {
      status = 400
      msg = `email must be unique`
      res.status(status).json({ msg })
   }
   else if (err.name == 'SequelizeValidationError') {
      status = 400
      errors = []
      for (let i = 0; i <= err.errors.length - 1; i++) {
         errors.push(err.errors[i].message)
      }
      res.status(status).json({ msg: errors })
   }
   else if (err.code === 404) {
      status = 404
      res.status(status).json({ msg })
   }
   else if (err.code === 401) {
      status = 401
      res.status(status).json({ msg })
   }
   else if (err.name === 'TokenExpiredError') {
      status = 400
      res.status(status).json({ msg })
   }
   else if (err.name === 'JsonWebTokenError') {
      status = 401
      res.status(status).json({ msg })
   }
   else {
      res.status(status).json({ msg })
   }
}