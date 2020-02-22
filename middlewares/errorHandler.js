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
      message: 'INPUT_ERROR',
      errors
    })
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    const errors = []
    for (const e of err.errors) {
      errors.push(e.message)
    }
    res.status(status).json({
      name: 'BAD REQUEST',
      message: 'UNIQUE_VALIDATION',
      errors
    })
  } else if (err.name === 'SequelizeForeignKeyConstraintError') {
    status = 400
    res.status(status).json({
      name: 'BAD REQUEST',
      message:'FOREIGN_KEY_CONSTRAINT',
      errors: [err.parent.detail]
    })
  } else if (err.name === 'LOGIN_FAILED') {
    status = err.status
    res.status(status).json({
      name: 'BAD REQUEST',
      message: err.name,
      error: err.error
    })
  } else if (err.name === 'UNAUTHORIZED') {
    status = err.status,
      res.status(status).json({
        name: err.name,
        message: err.message
      })
  } else if (err.name === 'NOT_FOUND') {
    status = err.status
    res.status(status).json({
      name: err.name,
      error: err.message
    })
  } else if (err.name === 'JsonWebTokenError') {
    status = 401
    res.status(status).json({
      name: 'UNAUTHORIZED',
      message: 'Please login first'
    })
  }
}

module.exports = errorHandler