const { Product } = require('../models')

class productController{

  static add(req, res, next){
    console.log('di kontroller');
    let image
    if(req.file == undefined){
      console.log('masuk kondisi {}{}{}{}{}{}{}{}{}');
      
      image = 'https://www.voa-islam.com//photos6/syafaat2019/November%202019/Ayam%20Ilustrasi.jpg'
    }else{
      image = req.file.cloudStoragePublicUrl
    }

    console.log(image, 'ini storage sekarang');
    
    Product.create({
      name: req.body.name,
      image_url: image,
      price: req.body.price,
      stock: req.body.stock,
      CategoryId: req.body.CategoryId
    })
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(next)
  }

  static getAll(req, res, next){

    Product.findAll()
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(next)
  }

  static remove(req, res, next){

    Product.destroy({
      where:{
        id:req.params.id
      }
    })
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(next)
  }

  static update(req, res, next){
    // console.log(req.body, 'ini body update');
    
    Product.update({
      name: req.body.name,
      image_url: req.body.image,
      price: req.body.price,
      stock: req.body.stock,
      CategoryId: req.body.CategoryId,
    }, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(next)

  }


}

module.exports = productController