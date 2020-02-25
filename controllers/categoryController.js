const {Product, CategoryProduct, Category} = require('../models')

class CategoryController {
    static allCategories(req, res, next) {
        Category.findAll({
            include: [Product],
            order: [['id', 'ASC']]
        })
            .then(categories => {
                res.status(200).json({
                    msg: 'success get all categories',
                    data: categories
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static getOneCategory(req, res, next) {
        Category.findOne({
            where: {
                id: req.params.categoryId
            },
            include: [Product]
        })
            .then(category => {
                if(category) {
                    res.status(200).json({
                        msg: `success get category id ${req.params.categoryId}`,
                        data: category
                    })
                } else {
                    next({
                        name: 'NotFound',
                        msg: 'category not found'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = CategoryController