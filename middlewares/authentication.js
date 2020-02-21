const { verifytoken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = (req, res, next) => {
    try {
        console.log('CEEEEKKKKKKKKKKK')
        const token = req.headers.token
        const decoded = verifytoken(token)
        if (token) {
            User.findByPk(decoded.id)
                .then(user => {
                    if (user) {
                        req.currentUserId = decoded.id
                        next()
                    } else {
                        next({
                            status: 401,
                            msg: "youre not authorized"
                        })
                    }
                })
        } else {
            next({
                status: 401,
                msg: "youre not authorized"
            })
        } 
    } catch {
        next({
            status: 401,
            msg: "youre not authorized"
        })
    }
}