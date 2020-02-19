module.exports = function (err, req, res, next) {
    // console.log(err, "<<<<<<<<<<<<<<<<<<<<< ERRORR")
    let status = 500
    let errObj = { message : "Internal Server Error", err }
    if (err.name === "SequelizeValidationError") {
        status = 400
        let messages = []
        err.errors.forEach( error => {
            messages.push(error.message)
        })
        errObj = {
            message : "BAD REQUEST",
            errors : messages
        }
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        status = 400
        let errorData = {
            message : "BAD REQUEST",
            error : err.errors[0].message
        }
        errObj = errorData
    } else if (err.name === "Email/Password Incorrectly") {
        status = 400
        errObj = {
            message : "BAD REQUEST",
            error : err.name
        }
    } else if (err.name === "NotFound") {
        status = 404
        errObj = {
            message : "NOT FOUND",
            error : "Products Out of Stock"
        }
    } else if (err.name === "NotAuthorized") {
        status = 401
        errObj = {
            message : "Not Authorized",
            error : "Access denied"
        }
    }

    res.status(status).json(errObj)
}