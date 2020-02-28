const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

module.exports = {
    register(req, res, next) {
        const { username, email, password, role } = req.body
        let registerAs = ''

        role ? registerAs = 'admin' : registerAs = 'user'

        User.create({
            username, email, password, role
        })
            .then(data => {
                res.status(201).json({
                    data,
                    message: `success register ${registerAs}`
                })
            })
            .catch(next)
    },
    login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: { email }
        })
            .then(data => {
                if (data) {
                    const check = checkPassword(password, data.dataValues.password)
                    if (check) {
                        const token = createToken(data.dataValues.id)
                        res.status(200).json({
                            token,
                            message: `success login as ${data.dataValues.username}`
                        })
                    } else {
                        next({
                            status: 400,
                            message: 'invalid password / email'
                        })
                    }
                } else {
                    next({
                        status: 400,
                        message: 'email not found'
                    })
                }
            })
            .catch(next)
    }
}