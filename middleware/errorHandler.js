module.exports = (err, req, res, next) => {
    let status = 500
    let errObj = {
        msg: 'internal server error'
    }

    // error validation
    if (err.name === 'SequelizeValidationError') {
        status = 400
        errObj = {
            msg: 'bad request',
            errors: []
        }
        err.errors.forEach(error => {
            errObj.errors.push(error.message)
        });
    }

    // error unique constraint
    if (err.name === 'SequelizeUniqueConstraintError') {
        status = 400
        errObj = {
            msg: "email already exist"
        }
    }

    // invalid input signin
    if (err.name === 'invalidInputSignIn') {
        status = 400
        errObj = {
            msg: 'invalid email or password'
        }
    }

    // error not found
    if (err.name === 'errorNotFound') {
        status = 404
        errObj = {
            msg: 'not found'
        }
    }

    // error authentication
    if (err.name === 'JsonWebTokenError') {
        status = 401
        errObj = {
            msg: 'you have to login first'
        }
    }

    // error authorization
    if (err.name === 'authorizationError') {
        status = 401
        errObj = {
            msg: 'unauthorized user'
        }
    }

    res.status(status).json(errObj)
}