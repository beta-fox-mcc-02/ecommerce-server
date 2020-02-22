const { Category, Product } = require('../models')

class CategoryController {
  static findAll(req, res, next) {
    Category.findAll({
      include: Product
    })
      .then(categories => res.status(200).json(categories))
      .catch(next)
  }

  static findByPk(req, res, next) {
    let { categoryId } = req.params
    Category.findByPk(categoryId, {
      include: Product
    })
      .then(category => res.status(200).json(category))
      .catch(next)
  }
}

module.exports = CategoryController