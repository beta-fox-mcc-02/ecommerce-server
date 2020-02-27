const { Admin, Customer } = require('../models')
const { verify } = require('../helpers/jwt')

module.exports = function(req, res, next) {
    try {
        let decoded = verify(req.headers.token)

        req.statusAccess = decoded.isAdmin
        if (req.statusAccess) {
            Admin.findByPk(decoded.id)
                .then(admin => {
                    if(admin) {
                        req.currentAdminId = decoded.id
                        // req.name = decoded.name
                        // req.email = decoded.email
                        next()
                    } else {
                        next({
                            name : "NotAuthorization"
                        })
                    }
                })
                .catch(next)
        } else {
            Customer.findByPk(decoded.id)
                .then(customer => {
                    console.log('MASUK CUSTOMER AUTH')
                    if(customer) {
                        req.currentCustomerId = decoded.id
                        req.nameCustomer = decoded.name
                        req.emailCustomer = decoded.email
                        next()
                    } else {
                        next({
                            name : "NotAuthorization"
                        })
                    }
                })
                .catch(next)
        }
    } catch(err) {
        next(err)
    }
}