const { User } = require('../models')

module.exports = (req, res, next) => {
   User.findOne({
      where: {
         id: req.currentUserId
      }
   })
      .then(data => {
         if(!data) {
            throw ({code: 404, message: `User doesn't exists`})
         }
         else {
            if (!data.isAdmin) {
               throw ({code: 401, message: `You're not authorized to make this request`})
            }
            else {
               next()
            }
         }
      })
      .catch(err => {
         next(err)
      })
}