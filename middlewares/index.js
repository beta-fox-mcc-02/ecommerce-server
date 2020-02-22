const errorHandler = require('./errorHandler')
const isAuthenticated = require('./isAuthenticated')
const isAdminAuthorized = require('./isAdminAuthorized')
const uploadImage = require('./uploadImage')

module.exports = { errorHandler, isAuthenticated, isAdminAuthorized, uploadImage }