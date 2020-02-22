module.exports = (err,req,res,next) => {
    console.log(err,'ini middleware')
    let obj = {
        status : 500,
        message : 'internal sistem eror'
    }
    if(err.name == 'SequelizeValidationError'){
        let arr = []
        if(err.errors.length > 1){
            err.errors.forEach(el => {
                arr.push(el.message)
            })
            obj.status = 400
            obj.message = arr
            console.log(arr,'ini arr')
        }else{
            err.errors.forEach(el => {
                obj.message = el.message
            })
            obj.status = 400
        }
        res.status(obj.status).json(obj)
    }
    else if (err.name === 'SequelizeDatabaseError'){
        obj.status = 404
        obj.message = 'data not found'
        res.status(obj.status).json(obj)
    }
    else if(err.name === 'JsonWebTokenError'){
        obj.status = 203
        obj.message = 'you must be provided'
        res.status(obj.status).json(obj)
    }
    else{
        res.status(obj.status).json(obj)
    }
}