const jwt = require('jsonwebtoken')

module.exports = {
    auth : (req, res, next) => {
        console.log(req.headers.token, 'tokkkkken')
        try{
            // console.log('masuuuk auth')
            const decoded = jwt.verify(req.headers.token, process.env.SECRET)
            req.decode = decoded
            next()
        } catch(err){
            next(err)
        } 
    }
}