const { Admin } = require('../models')
const jwt = require('jsonwebtoken')

class AdminController{
    static login(req, res, next) {
        Admin.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((data) => {
            if(data) {
                if(req.body.password === data.password) {
                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    let token = jwt.sign(payload, 'ucul')
                    res.status(200).json({ token })
                }
                else next({ message: `input invalid` })
            }
            else next({ message: `user not found` })
        })
        .catch((err) => next(err))
    }
}

module.exports = AdminController