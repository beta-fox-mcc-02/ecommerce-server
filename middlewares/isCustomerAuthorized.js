const { User, Role } = require('../models')
const { Op } = require('sequelize')

const isCustomerAuthorized = (req, res, next) => {
  const user_id = req.decoded
  User.findOne({
    include: [Role],
    where: {
      [Op.and]:[
        {
          id: user_id
        },
        {
          role_id: 2
        }
      ]
    }
  })
    .then(user => {
      if (user) {
        next()
      } else {
        next({
          status: 401,
          name: 'UNAUTHORIZED',
          message: 'Please register first'
        })
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = isCustomerAuthorized