const {Admin, Product} = require('../models')

class Controller{
    static register(req, res, next){
        const newAdmin = {
            email : req.body.email,
            password : req.body.password
        }
        Admin.create(newAdmin)
            .then(admin => {
                res.status(201).json(admin)
            })
            .catch(next)
    }
}

module.exports = Controller