const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = function(req, res, next) {
    const token = req.headers.user_token;
    
    if(!token) {
        next({
            name: 401,
            msg: 'Access denied. No token provided',
            process: 'Authentication'
        })
    } else {
        try{
            const decoded = jwt.decode(token);
            req.user = decoded;

            User.findByPk(req.user.id)
                .then(data=>{
                    if(data) {
                        next();
                    }
                    else {
                        next({
                            name: 401,
                            msg: 'Access denied. User id not found',
                            process: 'Authentication'
                        });
                    }
                })
                .catch(next);
        } catch(ex) {
            next({
                name: 400,
                msg: 'Invalid token',
                process: 'Authentication'
            })
        }
    }
}