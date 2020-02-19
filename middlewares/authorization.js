const { Task } = require('../models')

module.exports = function(req, res, next) {
    const id = req.params.id
    Task.findByPk(id)
        .then(taskData => {
            if (!taskData) {
                res.status(404).json('Task not found')
            }
            else {
                if(taskData.UserId == req.currentUserId) {
                    next()
                }
                else {
                    next({
                        name: 'AuthorizationError',
                        code: 401,
                        msg: 'Unauthorized User'
                    })
                }
            }
        })
        .catch(next)
}