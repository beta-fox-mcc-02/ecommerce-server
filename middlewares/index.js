const errorHandler = require('./errorHandler')
const isAuthenticated = require('./isAuthenticated')
const isAdminAuthorized = require('./isAdminAuthorized')
const uploadImage = require('./uploadImage')
const isCustomerAuthorized = require('./isCustomerAuthorized')

module.exports = {
  errorHandler,
  isAuthenticated,
  isAdminAuthorized,
  isCustomerAuthorized,
  uploadImage
}