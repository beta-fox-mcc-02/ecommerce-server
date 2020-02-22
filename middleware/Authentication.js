const jwt = require('../helper/jwt')
const { User } = require('../models')
module.exports = (req,res,next) => {
    try {
        const decoded = jwt.vertify(req.headers.token)
        console.log(decoded.payload.email,'INII BISA DONG')
        User.findOne(
            {where : {
                email : decoded.payload.email
            }
        })
            .then(data =>{
                console.log(data,'ini masuk')
                if(data){
                    next()
                }else{
                    next({
                        status : 203,
                        message : 'Email not get Authentication'
                    })
                }
            })
            .catch((err) => {
                next(err)
            });
    } catch (error) {
        next(error)
    }
}