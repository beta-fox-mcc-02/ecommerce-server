module.exports = (err, req, res, next) => {
    if(err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError') {
        res.status(400).json({
            msg: err.errors[0].message
        })
    } else if(err.name == 'LoginError') {
        res.status(400).json({
            msg: err.msg
        })
    } else {
        res.status(500).json(err)
    }
}