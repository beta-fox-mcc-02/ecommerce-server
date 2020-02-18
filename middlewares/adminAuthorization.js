module.exports = (req, res, next) => {
    if(req.decoded.role == 'admin') {
        next()
    } else {
        next({
            name: 'AuthorizationError',
            msg: 'authorized only'
        })
    }
}