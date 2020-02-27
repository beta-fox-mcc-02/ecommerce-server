module.exports = (err, req, res, next) => {
    let status = 500
    let error = { message: `internal server error` }
    if(err.name === 'SequelizeValidationError') {
        status = 400
        error.message = err.name
        error.details = []
        err.errors.forEach(i => { error.details.push(i.message) })
    }
    else if(err.name === 'JsonWebTokenError') {
        status = 401
        error.message = err.message
    }
    else if(err.message) {
        error.message = err.message
        switch(err.message){
            case `user not found`: status = 404; break
            case `input invalid`: status = 400; break
            case `invalid input syntax for type integer: "0.2"`: status = 400; break
            case `product may has been already deleted`: status = 404; break
        }
    }
    res.status(status).json(error)
}