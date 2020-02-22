const {Banner} = require('../models')

class bannerConttoller{
  static getAll(req, res, next){
    Banner.findAll()
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(next)
  }

  static add(req, res, next){
    let image
    if(req.file == undefined){
      // console.log('masuk kondisi {}{}{}{}{}{}{}{}{}');
      
      image = 'https://www.voa-islam.com//photos6/syafaat2019/November%202019/Ayam%20Ilustrasi.jpg'
    }else{
      image = req.file.cloudStoragePublicUrl
    }

    // console.log(req.body, 'ini jadwal');
    
    Banner.create({
      name: req.body.name,
      image: image,
      jadwal: req.body.jadwal
    })
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(next)
  }

  static remove(req, res, next){

    Banner.destroy({
      where:{
        id:req.params.id
      }
    })
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(next)
  }
}

module.exports = bannerConttoller