"use strict"
const { Product } = require('../models')

module.exports = (err, req, res, next) => {
    Product
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            if(user.RoleId === 1){
                next()
            } else {
                next(user)
            }
        })
        .catch(next)
}