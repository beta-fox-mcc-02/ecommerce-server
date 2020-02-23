const { Role } = require('../models');

class RoleController{
    static getRole (req, res, next) {
        Role.findAll({ attributes: [ "id", "name"] })
            .then(roles => {
                res.status(202).json({
                    role: roles,
                    msg: 'Get roles data Success' 
                })
            })
            .catch(next);
    }
}

module.exports = RoleController;