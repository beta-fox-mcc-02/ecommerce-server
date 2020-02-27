module.exports = (err, req, res, next) => {
    switch(err.name) {
        case 'SequelizeConnectionError':
            res.status(500).json({
                msg: 'Server Error',
            });
            break;
        case 'SequelizeDatabaseError':
            res.status(500).json({
                msg: 'Server Error'
            });
            break;
        case 'SequelizeValidationError':
            const messages = []
            for(let i = 0; i < err.errors.length; i++){
                messages.push(err.errors[i].message)
            }

            res.status(400).json({
                msg: messages
            })
            break;
        case 'errLogin':
            res.status(400).json({
                msg: 'Invalid username / password'
            })
        default:
            res.status(500).json({
                msg: 'Server Error'
            });
    }
}