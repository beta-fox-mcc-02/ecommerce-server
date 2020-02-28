const { Product } = require('../models')

module.exports = function(req, res, next) {
    const id = req.params.id
    Product.findByPk(id)
        .then(productData => {
            if (!productData) {
                res.status(404).json('Product not found')
            }
            else {
                next()
            }
        })
        .catch(next)
}