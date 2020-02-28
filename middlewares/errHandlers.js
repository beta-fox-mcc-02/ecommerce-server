
module.exports =  
  function errHandler(err, req, res, next) {
    let errors = []
    let status = 500
    
    if (err.name == "SequelizeValidationError" ||
        err.name == "SequelizeUniqueConstraintError"
    ) status = 400
    else if (
      err.name == "LoginError" || 
      err.name == "AuthenticationError" ||
      err.name == "AthorizationError" ||
      err.name == "ItemCannotBeFound"
      ) status = err.status
    
    err.errors.forEach(error => {
      errors.push(error.message)
    })

    res.status(status).json({errors})
    
  }