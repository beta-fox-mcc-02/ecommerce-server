const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = (req, res, next) => {
    let access_token = req.headers.access_token
    try{
        let decoded = verifyToken(access_token)
        User
            .findOne({
                where : {
                    email : decoded.email
                }
            })
            .then(user => {
                if(decoded.RoleId === 1) {
                    req.currentUserId = decoded.id
                    req.currentRoledId = decoded.RoleId
                    next()
                }
            })
    } catch(err) {
        next(err)
    }
}

