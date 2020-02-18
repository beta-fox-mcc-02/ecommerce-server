const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    // console.log(req.headers,'>===============================')
    try {
        const { id } = verifyToken(req.headers.token)

        User.findOne({ where: { id } })
            .then(data => {
                // console.log(data,'<============')
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