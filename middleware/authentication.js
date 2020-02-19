const { Admin } = require('../models')
const { verify } = require('../helpers/jwt')

module.exports = function(req, res, next) {
    try {
        let decoded = verify(req.headers.token)
        Admin.findByPk(decoded.id)
            .then(admin => {
                if(admin) {
                    req.currentAdminId = decoded.id
                    req.name = decoded.name
                    req.email = decoded.email
                    next()
                } else {
                    next({
                        name : "NotFound"
                    })
                }
            })
            .catch(next)

    } catch(err) {
        next(err)
    }
}