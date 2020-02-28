module.exports = function (err, req, res, next) {
    // console.log(err, "<<<<<<<<<<<<<<<<<<<<< ERRORR")
    console.log(err, `erorrrrrrrrrrrrrrrrrrrr`);
    
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
            errors : ['Email is already exists']
        }
        errObj = errorData
    } else if (err.name === "Email/Password Incorrectly") {
        status = 400
        errObj = {
            message : "BAD REQUEST",
            errors : [err.name]
        }
    } else if (err.name === "NotFound") {
        status = 404
        errObj = {
            message : "NOT FOUND",
            errors : ["Products Out of Stock"]
        }
    } else if (err.name === "NotAuthorized") {
        status = 401
        errObj = {
            message : "Not Authorized",
            errors : ["Access denied"]
        }
    } else if (err.name === 'Email/password wrong') {
        status = 400
        errObj = {
            message : "BAD REQUEST",
            errors : [err.name]
        }
    } else if (err.name === 'Maaf, barang sudah tidak tersedia') {
        status = 400
        err.obj = {
            errors : [err.name]
        }
    }

    res.status(status).json(errObj)
}