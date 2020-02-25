const axios = require('axios')
const { Product, ProductImage, sequelize, Category } = require('../models')
const { ImageHelper } = require('../helpers')

class ProductController {

  static addProduct(req, res, next) {
    const files = req.files
    const { name, price, stock, category_id, SKU, description, weight } = req.body
    const parameters = {
      name,
      price: +price,
      stock: +stock,
      category_id,
      SKU,
      description,
      weight: +weight
    }

    let response = {}
    return sequelize.transaction((t) => {
      return Product.create(parameters, { transaction: t })
        .then(newProduct => {
          response = newProduct
          return ImageHelper.uploadImage(files, newProduct)
            .then(
              axios.spread((...responses) => {
                const images = []
                for (const r of responses) {
                  images.push({
                    url: r.data.data.link,
                    product_id: newProduct.id,
                    title: r.data.data.title,
                    delete_hash: r.data.data.deletehash
                  })
                }
                return ProductImage.bulkCreate(images, { transaction: t })
              })
            )
            .catch(err => {
              next(err)
            })
        })
        .catch(err => {
          next(err)
        })
    })
      .then(result => {
        res.status(201).json({
          product: response
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteProduct(req, res, next) {
    const id = +req.params.id
    return sequelize.transaction((t) => {
      return ProductImage.destroy({
        where: {
          product_id: id
        }
      }, { transaction: t })
        .then(response => {
          return Product.destroy({
            where: {
              id
            }
          }, { transaction: t })
        })
        .catch(err => {
          next(err)
        })
    })
      .then(response => {
        if (response) {
          res.status(200).json({
            message: 'Delete product with id ' + id + ' successfully'
          })
        } else {
          next({
            status: 404,
            name: 'NOT_FOUND',
            message: 'Product with id ' + id + ' is not found'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static editProduct(req, res, next) {
    const id = +req.params.id
    const { name, price, stock, category_id, SKU, description, weight } = req.body
    const parameters = {
      name,
      price: +price,
      stock: +stock,
      category_id,
      SKU: SKU,
      description: description,
      weight: +weight
    }

    Product.update(parameters, {
      where: {
        id
      }, returning: true
    })
      .then(response => {
        if (response[0]) {
          res.status(200).json({
            product: response[1][0]
          })
        } else {
          next({
            status: 404,
            name: 'NOT_FOUND',
            message: 'Product with id ' + id + ' is not found'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static uploadImage(files, product) {
    const requests = []
    for (const f of files) {
      const file = f.buffer.toString('base64')
      const request = axios({
        method: 'POST',
        headers: {
          Authorization: 'Client-ID ' + process.env.IMGUR_CLIENT_ID,
        },
        url: process.env.IMGURL_UPLOAD_API_URL,
        data: {
          image: file,
          title: `${product.id}-${f.originalname}`
        }
      })
      requests.push(request)
    }
    return axios.all(requests)
  }

  static getProducts(req, res, next) {
    const limit = req.query.limit ? req.query.limit : 10
    const page = req.query.page ? req.query.page : 1
    Product.findAll({
      include: [Category, ProductImage],
      order: [
        ['id', 'DESC']
      ]
    })
      .then(products => {
        res.status(200).json({
          products
        })
      })
      .catch(next)
  }

  static findOneProduct(req, res, next) {
    const id = req.params.id
    Product.findOne({
      include: [Category, ProductImage],
      where: {
        id
      }
    })
      .then(product => {
        if (product) {
          res.status(200).json({
            product
          })
        } else {
          next({
            status: 404,
            name: 'NOT_FOUND',
            message: 'Product with id ' + id + ' not found'
          })
        }
      })
      .catch(next)
  }
}

module.exports = ProductController