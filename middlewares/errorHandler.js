module.exports = (err, req, res, next)=>{
  // console.log(err);
  
  let status = 500
  let errObj = {
    msg : 'Internal Server Error'
  }

  if(err.name==='SequelizeValidationError'){
    status = 400
    errObj.msg = 'Bad Request'
    errObj.errors = err.errors.map(el=> el.message)
  } else if (err.name==='SequelizeUniqueConstraintError'){
    status = 400
    errObj.msg = 'Bad Request'
    errObj.error = 'Email already registered' 
  } else {
    status = err.status
    errObj.msg = 'Bad Request'
    errObj.error = err.msg
  }

  res.status(status).json(errObj)
}