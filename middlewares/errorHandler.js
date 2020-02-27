module.exports = (err, req, res, next) => {

   let status = 500
   let msg = err.message

   if (err.name === 'SequelizeUniqueConstraintError') {
      status = 400
      msg = `email must be unique`
      res.status(status).json({ msg })
   }
   else if (err.name == 'SequelizeValidationError') {
      status = 400
      let errorArr = []
      for (let i = 0; i <= err.errors.length - 1; i++) {
         errorArr.push(err.errors[i].message)
      }

      res.status(status).json({ msg: errorArr })
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
   else if (err.code === 400) {
      status = 400
      res.status(status).json({ msg })
   }
   else {
      res.status(status).json({ msg })
   }
}