const {Admin} = require('../models')

module.exports = {
    check : (req, res, next) => {
        const id = req.decode.id
        Admin.findByPk(id)
            .then(Admin => {
                if(Admin){
                    next()
                }
                else{
                    const err = {
                        name : 'NotAuthorized',
                        message : 'Only Admin Allowed to Modify Data'
                    }
                    next(err)
                }
            })
            .catch(err => {
                const error = {
                    name : 'NotAuthorized',
                    message : 'Only Admin Allowed to Modify Data'
                }
                next(error)
            })
    }
}