const { Costumer } = require('../models')
const { checkingPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class CostumerController {
    static register(req, res, next){
        let { email, password } = req.body
        let createCostumer = { email, password }
        console.log(createCostumer, 'INI DATA REGISTERRRRRRR')
        Costumer
            .create(createCostumer)
            .then( costumer => {
                res.status(201).json({
                    id: costumer.id,
                    email: costumer.email
                })
            })
            .catch(next)
    }

    static login(req, res, next) {
        let { email, password } = req.body
        let loginCostumer = { email, password }
        console.log(loginCostumer, 'LOGIN COSTUMERSSSS')
        Costumer
            .findOne({
                where: {
                    email: loginCostumer.email
                }
            })
            .then( costumer => {
                if(costumer){
                    if(checkingPassword(loginCostumer.password, costumer.password) === true) {
                        let { id, email } = costumer
                        let access_token = generateToken({ id, email })
                        // req.currentUserId = costumer.id
                        // console.log(req.currentUserId, 'ini custumer idnya LOOOOOOHHHH')
                        res.status(200).json({
                            id: costumer.id,
                            access_token: access_token
                        })
                    } else {
                        console.log(costumer)
                        next({
                            name : `Invalid password / email!`
                        })
                    }
                } else {
                    next({
                        name : `Invalid password / email!`
                    })
                }
            })
            .catch(next)
    }
}

module.exports = CostumerController