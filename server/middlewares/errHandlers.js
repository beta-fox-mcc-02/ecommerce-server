
module.exports =  
  function errHandler(err, req, res, next) {
    const errors = []
    const status = 500
    
    console.log(err)
    if(err.name === "SequelizeValidationError") {
      status = 400
      err.errors.forEach(error => {
        errors.push(error.messages)
      })
    }
    res.status(status).json(errors)
  }