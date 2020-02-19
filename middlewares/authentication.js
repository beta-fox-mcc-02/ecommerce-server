const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const { Administrator } = require('../models')

module.exports = function(req, res, next) {
    const token = req.headers.access_token
    try {
        const decoded = jwt.verify(token, secret)
        Administrator.findByPk(decoded.id)
            .then(userData => {
                if(!userData) {
                    next({
                        name: 'DecodedError',
                        code: 401,
                        msg: 'User not logged in'
                    })
                }
                else{
                    req.currentUserId = decoded.id
                    next()
                }

            })
            .catch(next)
    }
    catch(err) {
        next(err)
    }
}