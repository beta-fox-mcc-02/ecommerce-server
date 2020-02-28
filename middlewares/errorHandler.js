module.exports = ((err, req, res, next) => {
  console.log(err, 'heyyyyy')
    let status = 500
    let msg = { msg: 'Internal Server Error' }
    if(err.name === 'SequelizeValidationError') {
      const errors = []
      err.errors.forEach(error => {
        errors.push(error.message)
      })
      msg = {
        msg: 'Bad Request',
        errors
      }
      status = 400
    }
    else if(err.name === 'WrongPassword') {
      status = 400
      msg = {
        msg: 'Invalid email / password'
      }
    }
    else if(err.name ==='JsonWebTokenError') {
      status = 400
      msg.msg = 'You need to be logged in to access this page'
    }
    res.status(status).json(msg)
  })