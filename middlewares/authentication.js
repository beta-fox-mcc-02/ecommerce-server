const { Admin } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    console.log(req.headers,'>===============================')
    try {
        const { id } = verifyToken(req.headers.token)
        
        Admin.findOne({ where: { id } })
        .then(data => {
            console.log(data,id,'<============')
                if (data) {
                    req.decoded = data.dataValues
                    next()
                } else {
                    next({
                        status: 403,
                        msg: 'please login firstly'
                    })
                }
            })
            .catch(next)
    } catch (err) {
        next(err)
    }
}