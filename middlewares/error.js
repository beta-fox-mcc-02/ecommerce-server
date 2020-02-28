module.exports = (err, req, res, next) => {
    if (err.name === "SequelizeValidationError") {
        let createMsg = {
            msg: []
        }
        err.errors.forEach(el => {
            createMsg.msg.push(el.message)
        });
        res.status(400).json({
            msg: createMsg.msg
        })
    } else {
        res.status(err.status || 500).json({
            msg: err.msg || "Invalid Server Error"
        })
    }
}