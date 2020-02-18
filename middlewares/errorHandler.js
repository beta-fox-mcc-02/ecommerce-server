module.exports = function(err, req, res, next){
  let status = 500
  let error = {
    message: 'internal server error',
    errors: []
  }
  console.log(err.message, " <<< err")
  //  console.log(err.status, 'ini errornya');
   
  if(err.name == 'SequelizeValidationError'){

   for(let key in err.errors) {
     error.errors.push(err.errors[key].message)
    }
    status = 400
  }else{
    console.log(err, 'lain lain');
    error.message = err.message
    status = err.status
    // error.errors.push(err.message)
    // res.status(err.status).json(err.message)
  }
  
  // console.log(error);
  res.status(status).json(error)
  
}