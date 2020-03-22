const { Role } = require('../models')

class RoleController {
    static findAll(req, res, next){
        Role
            .findAll()
            .then(roles => {
                res.status(200).json({
                    data : roles,
                    msg : `success fetch roles`
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = RoleController