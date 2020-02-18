const errorHandler = (err, req, res, next) => {
    let type = 'Bad Request';
    let status = err.status ? err.status : 500;
    let error = err.message ? err.message : 'Internal server error';
    if (err.name === 'SequelizeValidationError') {
        type = 'SequelizeValidationError';
        status = 400;
        error = [];
        err.errors.forEach(el => {
            error.push(el.message);
        });
    }
    if (err.name === 'SequelizeDatabaseError') {
        type = 'SequelizeDatabaseError';
        status = 400;
        error = 'Invalid input';
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
        type = 'SequelizeUniqueConstraintError';
        status = 400;
        error = 'Email already registered';
    }
    res.status(status).json({
        type,
        error
    });
}

module.exports = errorHandler;