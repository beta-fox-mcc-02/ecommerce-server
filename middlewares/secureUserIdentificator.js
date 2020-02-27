const jwt = require('jsonwebtoken')
const { Admin } = require('../models')

module.exports = {
    authentication: (req, res, next) => {
        let decoded = jwt.verify(req.headers.token, 'ucul')
        if(decoded.id) {
            Admin.findByPk(decoded.id)
            .then((data) => {
                if(data) {
                    req.currentUserId = data.id
                    req.currentEmail = data.email
                    next()
                }
                else next({ message: `invalid token / unidentified credentials` })
            })
            .catch((err) => next(err))
        }
        else next({ message: `invalid token / unidentified credentials` })
    },
    authorization: (req, res, next) => {
        if (req.currentEmail === 'masteradmin@smail.com') next()
        else next({ message: `invalid token / unidentified credentials` })
    }
}