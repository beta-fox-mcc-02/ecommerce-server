module.exports = (req, res, next) => {
    if(req.decoded.role == 'user') {
        next()
    } else {
        next({
            name: 'AuthorizationError',
            msg: 'authorized only'
        })
    }
}