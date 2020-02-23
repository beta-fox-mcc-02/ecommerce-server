const { User, Role } = require('../models');
const { compare } = require('../helpers/bcrypt');
const { sign } = require('../helpers/jwt.js');

class UserController{
    static createAdmin(req, res, next) {
        const { email, password } = req.body;
    
        User.create({ email, password, RoleId: 1 })
            .then( user => {        
                res.status(201).json({
                    email: user.email,    
                    msg: 'Register Admin Success' 
                })
            })
            .catch(next)
    }

    static  loginAdmin(req, res, next) {
        const { email, password } = req.body;

        User.findOne({
            where: { email, RoleId: 1 },
            include: [{
                model: Role
            }]
        })
            .then(user => {
                if(user !== null) {
                    let isValid = compare(password, user.password);

                    if(isValid) {
                        const token = sign({ id: user.id });
                        res.status(200).json({
                            token,
                            msg: "Login Admin Success"
                        });
                    } else {
                        const err = {
                            name: "errLogin"
                        }
                        next(err)
                    }    
                }
                else {
                    const err = {
                        name: "errLogin"
                    }
                    next(err)
                }
            })
            .catch(err=> {
                next(err);
            });
    }
}

module.exports = UserController;