const jwt = require('../helpers/jwtoken');
const {User, Product} = require('../models');

module.exports = {
    authentication : (req, res, next) => {
        try {
            const token = req.headers.access_token;

            if(token) {
                const decoded = jwt.verifyToken(token);
                req.decoded = decoded
                User.findOne({
                    where: {id: decoded.id}
                })
                    .then(data => {
                        if(data) {
                            next()
                        } else {
                            const error = {
                                name: 'Not authenticated',
                                message: 'You are not authenticated'
                            }
                            next(error);
                        }
                    })
                    .catch(err => {
                        next(err);
                    })
            } else {
                const error = {
                    name: 'Not authenticated',
                    message: 'You are not authenticated'
                }
                next(error);
            }
        } catch (err) {
            next(err)
        }
    },

    authorization: (req, res, next) => {
        const roles = req.decoded.roles;
        if(roles === 'admin') {
            next();
        } else {
            const error = {
                name: 'Not authorized',
                message: 'You are not authorized'
            }
            next(error);
        }
  
    }
}