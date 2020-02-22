module.exports = (err, req, res, next)=>{
    let statusCode = null
    let message = ''
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
    }else{
        statusCode = 500
        message = 'Internal server error'
    }
    // console.log(statusCode,message,'"/\/\/\///\/\//\\/\/\/\/\/\//\\//\\/\/\//\"')
    
    res.status(statusCode).json({
        message
    })
}