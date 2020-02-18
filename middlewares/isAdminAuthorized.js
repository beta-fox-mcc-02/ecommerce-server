const { User, Role } = require('../models')

const isAdminAuthorized = (req, res, next) => {
  const user_id = req.decoded
  User.findOne({
    include: [Role],
    where: {
      id: user_id
    }
  })
    .then(user => {
      if (user) {
        if (user.Role.id === 1) {
          next()
        } else {
          next({
            status: 401,
            name: 'UNAUTHORIZED',
            message: 'You are not authorized'
          })
        }
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

module.exports = isAdminAuthorized