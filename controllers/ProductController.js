const { Product } = require('../models')
const { base64_encode } = require('../helpers/base_64')
const axios = require('axios')
class ProductController {
  static create(req, res, next) {
    if (!req.file) {
      next({ name: 'NoImageAttached' })
    } else {
      const options = {
        headers: { Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}` }
      }
      const image = base64_encode(req.file.path)
      axios
        .post('https://api.imgur.com/3/image', image, options)
        .then(response => {
          const product = {
            name: req.body.name,
            image_url: response.data.data.link,
            price: +req.body.price,
            stock: +req.body.stock
          }
          Product.create(product)
            .then(result => {
              res.status(201).json({
                product: result
              })
            })
            .catch(next)
        })
        .catch(next)
    }
  }
  static findOne(req, res, next) {
    const { id } = req.params
    Product.findByPk(id)
      .then(result => {
        if (result) {
          res.status(200).json({ product: result })
        } else {
          next({ name: 'productNotFound' })
        }
      })
      .catch(next)
  }
  static findAll(req, res, next) {
    Product.findAll()
      .then(result => {
        res.status(200).json({ products: result })
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { id } = req.params
    const { name, price, stock } = req.body
    const product = {
      name,
      price: +price,
      stock: +stock
    }

    Product.update(product, { where: { id }, returning: true })
      .then(result => {
        res.status(200).json({ product: result[1][0] })
      })
      .catch(next)
  }

  static updateImage(req, res, next) {
    const { id } = req.params
    const options = {
      headers: { Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}` }
    }
    const image = base64_encode(req.file.path)
    axios
      .post('https://api.imgur.com/3/image', image, options)
      .then(response => {
        const product = {
          image_url: response.data.data.link
        }
        Product.update(product, { where: { id }, returning: true })
          .then(result => {
            res.status(200).json({ product: result[1][0] })
          })
          .catch(next)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const { id } = req.params
    Product.destroy({ where: { id } })
      .then(result => {
        res.status(204).json({})
      })
      .catch(next)
  }
}

module.exports = ProductController
