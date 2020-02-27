module.exports = (err, req, res, next)=>{
    let statusCode = 500
    let message = 'Internal server error'
    let temp = []
    console.log(err, "<><><>")
    if(err.name == 'SequelizeValidationError'){
        err.errors.forEach(el => {
            temp.push(el.message)
        });
        statusCode = 400
        message = temp[0]
    }else if(err.status){
        statusCode = err.status
        message = err.message
    }else if(err.name === 'JsonWebTokenError'){
        statusCode = 403
        message = 'You must login first'
    }
    res.status(statusCode).json({
        message
    })
}