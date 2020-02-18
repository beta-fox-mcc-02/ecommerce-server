const { Category } = require('../models')

class CategoryController{
  static findAll (req, res, next) {
    Category.findAll()
    .then((data) => {
      res.status(200).json({data})
    })
    .catch((err) => next(err))
  }
}

module.exports = CategoryController