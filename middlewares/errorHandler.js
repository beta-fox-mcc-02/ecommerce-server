module.exports = (err, req, res, next) => {
    let errObj = {
        err: "",
        msg: []
    };
    let status = 500
    if (err.name === "SequelizeValidationError") {
        status = 400;
        errObj.err = err.name
        // console.log(err.errors)
        err.errors.forEach(error => {
            errObj.msg.push(error.message)
        })
        res.status(status).json(errObj)
        // console.log(errObj, "dari errorhandler")
    } else if (err.err) {
        status = 404;
        res.status(status).json(err)
    } else if (!err.length) {
        status = 404
        errObj.err = "NOT FOUND"
        errObj.msg = "DATA NOT FOUND"
        res.status(status).json(errObj)
    } else {
        errObj.err = 'INTERNAL SERVER ERROR'
        err.errors.forEach(error => {
            errObj.msg.pusg(error.message)
        })
        res.status(status).json(errObj)
    }
}