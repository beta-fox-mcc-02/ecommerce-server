const { ProductImage, sequelize } = require('../models')
const { ImageHelper } = require('../helpers')
const axios = require('axios')

class ProductImageController {
  static updateProductImage(req, res, next) {
    const product = JSON.parse(req.body.product)[0]
    const id = +req.params.id
    ProductImage.findOne({
      where: {
        id
      }
    })
    .then(image => {
      if (image) {
        return sequelize.transaction((t) => {
          return ImageHelper.deleteImagesInImgur([image])
          .then(
            axios.spread((...responses) => {
              return ImageHelper.uploadImage(req.files, product)
              .then(
                axios.spread((...responses) => {
                  const images = []
                  for (const r of responses) {
                    images.push({
                      url: r.data.data.link,
                      product_id: product.id,
                      title: r.data.data.title,
                      delete_hash: r.data.data.deletehash
                    })
                  }
                  const input = {
                    url: images[0].url,
                    title: images[0].title,
                    product_id: images[0].product_id,
                    delete_hash: images[0].delete_hash
                  }
                  return ProductImage.update(input, {
                    where: {
                      id
                    }, returning: true
                  }, { transaction: t })
                })
              )
              .catch(err => {
                next(err)
              })
            })
          )
          .catch(err => {
            next(err)
          })
        })
        .then(result => {
          res.status(200).json({
            product: result[1][0]
          })
        })
        .catch(err => {
          next(err)
        })
      } else {
        next({
          status: 404,
          name:'NOT_FOUND',
          message: 'Product image with id '+id+ ' is not found'
        })
      }
    })
    .catch(err =>{
      next(err)
    })
  }

  static deleteProductImage(req, res, next) {
    const id = +req.params.id
    ProductImage.findOne({
      where: {
        id
      }
    })
    .then(image => {
      if (image) {
        return sequelize.transaction((t) => {
          return ImageHelper.deleteImagesInImgur ([image])
          .then(
            axios.spread((...responses) => {
              return ProductImage.destroy({
                where: {
                  id
                }
              }, { transaction: t })
            })
          )
          .catch(err => {
            next(err)
          })
        })
      } else {
        next({
          status: 404,
          name:'NOT_FOUND',
          message: 'Product image with id '+id +' is not found'
        })
      }
    })
    .then(result => {
      res.status(200).json({
        message:'Delete product images with id '+id + ' successfully'
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static addProductImage(req, res, next) {
    const product = JSON.parse(req.body.product)[0]
    return sequelize.transaction ((t) => {
      return ImageHelper.uploadImage(req.files, product)
      .then(
        axios.spread((...responses) => {
          const images = []
          for (const r of responses) {
            images.push({
              url: r.data.data.link,
              product_id: product.id,
              title: r.data.data.title,
              delete_hash: r.data.data.deletehash
            })
          }
          return ProductImage.create({
            url: images[0].url,
            title: images[0].title,
            product_id: images[0].product_id,
            delete_hash: images[0].delete_hash
          }, { transaction: t })
        })
      )
      .catch(err => {
        next(err)
      })
    })
    .then(result => {
      res.status(200).json({
        productImage: result
      })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = ProductImageController