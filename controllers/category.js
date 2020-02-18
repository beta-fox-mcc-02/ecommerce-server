const { Category } = require('../models')

class CategoryController {
  static create(req, res, next) {
    const input = {
      name: req.body.name,
      path: req.body.path
    }
    Category.create(input)
      .then(category => {
        res.status(201).json({
          data: category,
          message: 'CATEGORY_CREATED'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static update(req, res, next) {
    const id = +req.params.id
    const input = {
      name: req.body.name,
      path: req.body.path
    }
    Category.update(input, {
      where: {
        id
      }, returning: true
    })
      .then(response => {
        res.status(200).json({
          data: response[1][0],
          message: 'CATEGORY_UPDATED'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static findCategory(req, res, next) {
    const id = +req.params.id
    Category.findOne({
      where: {
        id
      }
    })
      .then(category => {
        if (category) {
          res.status(200).json({
            id: category.id,
            name: category.name,
            path: category.path
          })
        } else {
          next({
            status: 404,
            name: 'NOT_FOUND',
            message: 'Category is not found with id ' + id
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static delete(req, res, next) {
    const id = +req.params.id
    Category.destroy({
      where: {
        id
      }
    })
      .then(response => {
        if (response) {
          res.status(200).json({
            message: 'CATEGORY_DELETED'
          })
        }
      })
      .catch(next)
  }

  static getCategories(req, res, next) {
    Category.findAll()
      .then(categories => {
        const data = []
        for (const c of categories) {
          data.push({
            id: c.id,
            name: c.name,
            path: c.path
          })
        }
        res.status(200).json(data)
      })
      .catch(err => next(err))
  }
}

module.exports = CategoryController