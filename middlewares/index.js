const errorHandler = require('./errorHandler')
const isAuthenticated = require('./isAuthenticated')
const isAdminAuthorized = require('./isAdminAuthorized')

module.exports = { errorHandler, isAuthenticated, isAdminAuthorized }