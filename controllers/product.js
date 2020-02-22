const dropboxAPI = require('dropbox-v2-api')
const fs = require('fs')
const axios = require('axios')
const { Product, ProductImage, sequelize, Category } = require('../models')

const dropbox = dropboxAPI.authenticate({
  token: 'QAKfRt0bOUEAAAAAAAACQ12g89DmieYR617zrXtle2_AICJmp1hgLISm629-pFMf'
})

class ProductController {

  static addProduct(req, res, next) {
    const files = req.files
    const input = JSON.parse(req.body.product)[0]
    const parameters = {
      name: input.name,
      price: input.price,
      stock: input.stock,
      category_id: input.category.id,
      SKU: input.SKU,
      description: input.description,
      weight: input.weight
    }

    let response = {}
    return sequelize.transaction ((t) => {
      return Product.create(parameters, { transaction: t})
      .then(newProduct => {
        response = newProduct
        return ProductController.uploadImage(files, newProduct)
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
            return ProductImage.bulkCreate(images, { transaction: t})
          })
        )
        .catch(errors => {
          next(errors)
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

  static deleteProductImagesInCloud (images) {
    const requests = []
    for (const image of images) {
      const request = axios({
        method: 'DELETE',
        headers: {
          Authorization :'Client-ID '+process.env.IMGUR_CLIENT_ID,
        },
        url: `${process.env.IMGURL_DELETE_API_URL}/${image.delete_hash}`,
      })
      requests.push(request)
    }
    return axios.all(requests)
  }

  static deleteProductImage (id, next) {
    return ProductImage.findAll({
      where: {
        product_id: id
      }
    })
    .then(images => {
      const ids = []
      return ProductController.deleteProductImagesInCloud(images)
    })
    .catch(next)
  }

  static deleteProduct (req, res, next) {
    const id = +req.params.id
    ProductImage.destroy({
      where: {
        product_id: id
      }
    })
    .then(response => {
      Product.destroy({
        where: {
          id
        }
      })
      .then(response => {
        res.status(200).json({
          message: 'Delete Product with id '+id+ ' successfully'
        })
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static editProduct (req, res, next) {
    const id = +req.params.id
    const files = req.files
    const input = JSON.parse(req.body.product)[0]
    const parameters = {
      name: input.name,
      price: input.price,
      stock: input.stock,
      category_id: input.category.id,
      SKU: input.SKU,
      description: input.description,
      weight: input.weight
    }

    let response = {}
    return sequelize.transaction ((t) => {
      return Product.update(parameters, {
        where :{
          id
        },returning: true
      } ,{ transaction: t})
      .then(product => {
        response = product[1][0]
        return ProductController.deleteProductImage(id)
        .then(
          axios.spread((...responses) => {
            ProductImage.destroy({
              where: {
                product_id: id
              }
            }, { transaction: t })
            .then(response => {
              return ProductController.uploadImage(files, product[1][0])
              .then(
                axios.spread((...responses) => {
                  const images = []
                  for (const r of responses) {
                    images.push({
                      url: r.data.data.link,
                      product_id: product[1][0].id,
                      title: r.data.data.title,
                      delete_hash: r.data.data.deletehash
                    })
                  }
                  return ProductImage.bulkCreate(images, { transaction: t })
                })
              )
              .catch(next)
            })
            .catch(next)
          })
        )
        .catch(errors => {
          next(errors)
        })
      })
      .catch(err => {
        next(err)
      })
    })
    .then(result => {
      res.status(200).json(response)
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
            Authorization :'Client-ID '+process.env.IMGUR_CLIENT_ID,
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
      limit,
      page
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
      include:[Category, ProductImage],
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
          message: 'Product with id '+id+ ' not found'
        })
      }
    })
    .catch(next)
  }
}

module.exports = ProductController