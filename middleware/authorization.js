const { Admin } = require('../models')

module.exports = function (req, res, next) {
    Admin.findByPk(req.currentAdminId)
        .then(admin => {
            if(admin) {
                next()
            } else {
                next({
                    name : "NotAuthorized"
                })
            }
        })
        .catch(next)
}