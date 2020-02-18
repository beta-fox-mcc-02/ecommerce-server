const errorHandler = (err, req, res, next) => {
  let status = 500
  if (err.name === 'SequelizeValidationError') {
    status = 400
    const errors = []
    for (const e of err.errors) {
      errors.push(e.message)
    }
    res.status(400).json({
      name: 'BAD REQUEST',
      message: 'FAILED_CREATED_USER',
      errors
    })
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    const errors = []
    for (const e of err.errors) {
      errors.push(e.message)
    }
    res.status(status).json({
      name:'BAD REQUEST',
      message:'UNIQUE_VALIDATION',
      errors
    })
  } else if (err.name === 'LOGIN_FAILED') {
    status = err.status
    res.status(status).json({
      name: 'BAD REQUEST',
      message: err.name,
      error: err.error
    })
  }
}

module.exports = errorHandler