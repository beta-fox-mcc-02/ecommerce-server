const { Category } = require('../models')

class CategoryController {
  static create (req, res, next) {
    let { name } = req.body
    let input = { name }
    Category.create(input, {
      returning: true
    })
      .then(data => {
        // console.log(data)
        res.status(201).json({
          data,
          msg: 'success create category'
        })
      })
      .catch(err => {
        next({
          error: err,
          msg: 'fail create category'
        })
      })
  }

  static findAll (req, res, next) {
    Category.findAll({
      order: [[ 'id', 'asc' ]]
    })
      .then(categories => {
        if(categories.length != 0) {
          res.status(200).json({
            data: categories,
            msg: 'success get categories'
          })
        } else {
          res.status(200).json({
            data: [{
              id: '',
              name: ''
            }]
          })
        }
      })
      .catch(err => {
        next({
          error: err
        })
      })
  }

  static findOne (req, res, next) {
    let id = +req.params.id
    Category.findOne({
      where: {
        id
      }
    })
      .then(category => {
        if(category) {
          res.status(200).json({
            data: category,
            msg: 'success get category'
          })
        } else {
          next({
            error: {
              name: 'not found'
            },
            status: 400,
            msg: 'category not found'
          })
        }
      })
      .catch(err => {
        next({
          error: {
            name: 'fail'
          },
          status: 400,
          msg: 'fail get category'
        })
      })
  }

  static update (req, res, next) {
    let id = +req.params.id
    let { name } = req.body
    let input = { name }
    Category.findOne({ where: { id } })
      .then(category => {
        if(category) {
          Category.update(input, { where: { id } })
            .then(data => {
              res.status(200).json({ msg: 'success update category' })
            })
            .catch(err => {
              next({ error: err, msg: 'fail update category' })
            })
        } else {
          next({ error: { name: 'not found'}, status: 400, msg: 'category not found' })
        }
      })
      .catch(err => {
        next({ error: err, msg: 'bad request' })
      })
  }

  static delete (req, res, next) {
    let id = +req.params.id
    Category.findOne({ where: { id } })
      .then(category => {
        if(category) {
          Category.destroy({ where: { id } })
            .then(data => {
              res.status(200).json({ msg: 'success delete category' })
            })
            .catch(err => {
              next({ error: err, msg: 'fail delete category' })
            })
        } else {
          next({ error: { name: 'not found'}, status: 400, msg: 'category not found' })
        }
      })
      .catch(err => {
        next({ error: err, msg: 'bad request' })
      })
  }
}

module.exports = CategoryController