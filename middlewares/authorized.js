const {User} = require('../models')


module.exports =
  function (req, res, next) {
    let pk = req.currentUserId
    console.log('sampe authorized');
    

    
    User.findOne({
      where: {
        id: req.currentUserId
      }
    })
    .then(data => {
      console.log(req.currentUserId, 'ini masuk');
      console.log(data);
      
        
        if (data.admin == true) {
          next()
        } else {
          res.status(400).json({
            msg: `unauthorized`
          })
        }
      })
      .catch(err => {
        res.status(400).json({
          msg: `data not found`
        })
      })
  }