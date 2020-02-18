const {User} = require('../models');
const bcrypt = require('../helpers/bcrypt');
const jwt = require('../helpers/jwtoken');

class Controller {
    static register(req, res, next) {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            roles: req.body.roles
        })
            .then(newUser => {
                res.status(201).json(newUser);
            })
            .catch(err => {
                next(err);
            })
    }

    static login(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(data => {
                if(data) {
                    const passwordCheck = bcrypt.compareSync(req.body.password, data.password);

                    if(passwordCheck) {
                        const payload = {
                            id: data.id,
                            email: data.email,
                            roles: data.roles
                        }
                        const token = jwt.generateToken(payload);
                        res.status(200).json({access_token: token});
                    } else {
                        const error = {
                            name: 'Not found',
                            message: 'Email or password is invalid' 
                        }
                        next(error);
                    }
                } else {
                    const error = {
                        name: 'Not found',
                        message: 'Email or password is invalid'
                    }
                    next(error);
                }
            })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = Controller;