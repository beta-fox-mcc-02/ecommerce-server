const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

module.exports = (req, res, next) => {
    try {
        let decoded = verifyToken(req.headers.access_token)
        req.decoded = decoded
        User.findOne({
            where: {
                id: req.decoded.id
            }
        })
            .then(user => {
                if(user) {
                    next()
                } else {
                    next({
                        name: "AuthenticationError",
                        msg: 'login required'
                    })
                } 
            })
    } catch (err) {
        next({
            name: "AuthenticationError",
            msg: 'login required'
        })
    }
}