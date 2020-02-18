const { User } = require('../models')
const { verifyToken } =  require('../helpers/jwt')

module.exports = function(req, res, next) {
    const { token } = req.headers
    const err = {
        name: 'authorizationError'
    }

    try {
        const decoded = verifyToken(token)
        User.findOne({
            where: {
                id: decoded.id,
                email: decoded.email,
                role: 'admin'
            }
        })
            .then(response => {
                if (response) {
                    next()
                } else {
                    next(err)
                }
            })
            .catch(err => {
                next(err)
            })
    }
    catch(err) {
        next(err)
    }
}