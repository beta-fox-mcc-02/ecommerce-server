const jwt = require('jsonwebtoken')

module.exports = {
    auth : (req, res, next) => {
        try{
            console.log('masuuuk auth')
            const decoded = jwt.verify(req.headers.token, process.env.SECRET)
            if(decoded === 'JsonWebTokenError'){
                next(decoded)
            }
            else{
                req.decode = decoded
                next()
            }
        } catch(err){
            next(err)
        } 
    }
}