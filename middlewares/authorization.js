const { Product } = require('../models')

module.exports = function(req, res, next) {
    const id = req.params.id
    Task.findByPk(id)
        .then(productData => {
            if (!productData) {
                res.status(404).json('Product not found')
            }
            else {
                if(productData.UserId == req.currentUserId) {
                    next()
                }
                else {
                    next({
                        name: 'AuthorizationError',
                        code: 401,
                        msg: 'Unauthorized User'
                    })
                }
            }
        })
        .catch(next)
}