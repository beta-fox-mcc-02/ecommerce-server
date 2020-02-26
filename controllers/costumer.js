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
        console.log(loginCostumer)
        Costumer
            .findOne({
                where: {
                    email: loginCostumer.email
                }
            })
            .then( costumer => {
                let { id, email } = costumer
                let access_token = generateToken({ id, email })
                res.status(201).json({
                    access_token: access_token
                })
            })
            .catch(next)
    }
}

module.exports = CostumerController