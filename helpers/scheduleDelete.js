const CronJob = require('cron').CronJob
const {Product, CartProduct} = require('../models')

const job = new CronJob('00 00 00 * * *', () => {
    const deleted = []
    Product.findAll()
        .then(product => {
            for (let i = 0; i < product.length; i++) {
                if (product[i].stock === 0){
                    deleted.push(product[i])
                }
            }
            if (deleted.length) {
                const toBeDeleted = deleted.map(el => {
                    return CartProduct.destroy({where : {ProductId : el.id}})
                })
                return Promise.all(toBeDeleted)
            }
            else return deleted
        })
        .then(del => {
            if (deleted.length) {
                const toBeDeleted = deleted.map(el => {
                    return Product.destroy({where : {id : el.id}})
                })
                return Promise.all(toBeDeleted)
            }
            else return deleted
        })
        .then(del => {
            if (deleted.length) {
                console.log(`${deleted.join(', ')} succesfuly deleted because the products already out of stock`)
            }
            else console.log('all product is available to sell')
        })
        .catch(err => {
            console.log('there something wrong with schedule, the error is', err.stack)
        })
}, null, true, 'Asia/Jakarta')

module.exports = job