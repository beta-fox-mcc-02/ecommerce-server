const { User } = require('../models')
const { checkingPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')


class UserController{


//COSTUMER =============================================================
    static registerCostumer(req, res, next){
        let {email, password} = req.body
        let newUserRegistered = {email, password} 
        newUserRegistered.RoleId = 2

        User
            .create(newUserRegistered)
            .then( admin => {
                res.status(201).json({
                    id: admin.id,
                    email : admin.email
                })
            })
            .catch( err => {
                next(err)
            })
    }
    
// ADMIN ==========================================================
    static registerAdmin(req, res, next){
        let {email, password} = req.body
        let newUserRegistered = {email, password} 
        newUserRegistered.RoleId = 1

        User
            .create(newUserRegistered)
            .then( admin => {
                res.status(201).json({
                    id: admin.id,
                    email : admin.email
                })
            })
            .catch( err => {
                next(err)
            })
    }




    static login(req, res, next){
        let { email, password } = req.body
        let loginUser = { email, password }
        console.log(req.body)

        User
            .findOne({
                where: {
                    email : loginUser.email
                }
            })
            .then(user => {
                if(user){
                    if(checkingPassword(loginUser.password, user.password) === true) {
                        let { id, email, RoleId} = user
                        let getToken = { id, email, RoleId}
                        let token = generateToken(getToken)
                        console.log(token)
                        res.status(200).json({
                            access_token : token
                        })
                    } else {
                        console.log(user)
                        next({
                            name : `Invalid password / email!`
                        })
                        // res.status(404).json({
                        //     error : `Invalid password / email!`
                        // })
                    }
                } else {
                    // next(user)
                    next({
                        name : `Invalid password / email!`
                    })
                    // res.status(404).json({
                    //     error : `Invalid password / email!`
                    // })
                }
            })
            .catch(err => {
                next(err)
                // res.status(500).json({
                //     error: `Internal Server Error`
                // })
            })
        
    }



}

module.exports = UserController