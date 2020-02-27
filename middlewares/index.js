const errorHandler = require('./errorHandler')
const isAuthenticated = require('./isAuthenticated')
const isAdminAuthorized = require('./isAdminAuthorized')
const uploadImage = require('./uploadImage')
const isCustomerAuthorized = require('./isCustomerAuthorized')
const isCartAuthorized = require('./isCartAuthorized')

module.exports = {
  errorHandler,
  isAuthenticated,
  isAdminAuthorized,
  isCustomerAuthorized,
  uploadImage,
  isCartAuthorized
}