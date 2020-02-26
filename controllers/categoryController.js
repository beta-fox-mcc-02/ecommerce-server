const { Category } = require('../models')

class CategoryController {
    static getAll (req, res, next) {
        Category.findAll () 
            .then(categories => {
                res.status(200).json({
                    categories
                })
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
}

module.exports = CategoryController