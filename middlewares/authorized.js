const { User } = require('../models')

module.exports = {
    admin(req, res, next) {
        const { role } = req.decoded
        
        role ? next() : next({
            status: 401,
            msg: 'This action for admin only'
        })
    }
}