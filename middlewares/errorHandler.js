module.exports = (err, req, res, next) => {
    if(err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError') {
        res.status(400).json({
            msg: err.errors[0].message
        })
    } else if(err.name == 'LoginError' || err.name == 'EmptyCategory') {
        res.status(400).json({
            msg: err.msg
        })
    } else if(err.name == 'AuthenticationError' || err.name == 'AuthorizationError') {
        res.status(401).json({
            msg: err.msg
        })
    } else if (err.name == 'Forbidden') {
        console.log('masuk error')
        res.status(403).json({
            msg: err.msg
        })
    } else if(err.name == 'NotFound') {
        res.status(404).json({
            msg: err.msg
        })
    } else {
        res.status(500).json(err)
    }
}