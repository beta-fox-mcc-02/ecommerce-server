const {
    Cart
} = require('../models')

module.exports = {
    authorize: (req, res, next) => {
        try {
            Cart.findOne({
                where: {
                    id: req.params.id
                }
            })
                .then(data => {
                    if (data) {
                        if (data.UserId === req.UserId) {
                            next()
                        } else {
                            let err = {
                                err: "NOT AUTHORIZED",
                                msg: "YOU ARE NOT AUTHORIZE TO DO THIS ACTION"
                            }
                            next(err)
                        }
                    } else {
                        let err = {
                            err: "NOT AUTHORIZED",
                            msg: "YOU ARE NOT AUTHORIZE TO DO THIS ACTION"
                        }
                        next(err)
                    }
                })
                .catch(err => {
                    next(err)
                })
        }
        catch(err) {
            next(err)
        }
    }
}