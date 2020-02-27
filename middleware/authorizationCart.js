const { Cart } = require('../models')

module.exports = function(req, res, next) {
  const { id } = req.decoded

  Cart.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(response => {
      if (response.UserId === id) {
        next()
      } else {
        res.status(401).json({
          msg: 'not authorized'
        })
      }
    })
    .catch(err => {
      console.log('error authorization', err)
      next(err)
    })
}