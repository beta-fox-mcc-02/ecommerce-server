const { verifyToken } = require('../helpers/jwt')
const { Person } = require('../models/index')

const authentication = (req, res, next) => {
    if (req.headers.token) {
        try {
            let decoded = verifyToken(req.headers.token);
            Person.findOne({
                where: {
                    id: decoded.id
                }
            })
                .then(person => {
                    if (person && person.user_role === 'admin') {
                        req.decoded = decoded
                        next()
                    } else {
                        next({
                            status: 401,
                            message: 'Unauthorized'
                        })
                    }
                })
                .catch(err => {
                    next(err)
                })
        } catch (error) {
            next({
                status: 401,
                message: 'Unauthorized'
            })
        }
    } else {
        next({
            status: 401,
            message: 'Unauthorized'
        })
    }
}

module.exports = authentication