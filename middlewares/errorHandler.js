module.exports = (err, req, res, next) => {
    const error = err
    // console.log(error)
    if(err.name === 'SequelizeValidationError'){
        const messages = []
        for(let i = 0; i < error.errors.length; i++){
            messages.push(error.errors[i].message)
        }
        res.status(400).json({
            err : messages
        })
    }
    else if(err.name === 'SequelizeDatabaseError'){
        res.status(500).json({
            err : 'Internal Server Error'
        })
    }
}