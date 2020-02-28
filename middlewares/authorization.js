const { User } = require('../models')

module.exports = (req, res, next) => {
    User.findOne({
        where: {
            id: req.currentUserId
        }
    })
        .then(user => {
            if (user.role) {
                next()
            } else {
                next({
                    status: 401,
                    msg: 'youre not authorized'
                })
            }
        })
        .catch(next)
}