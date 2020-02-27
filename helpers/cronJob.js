const { Product, Cart } = require('../models')
var CronJob = require('cron').CronJob;

const job = new CronJob('0 0 1 1 *', function () {
   console.log('CRON JALAN NICHHHH');
   
  Product.destroy({
     where: {
        stock: 0
     }
  })
   .then(data => {
      console.log(`Products with 0 stock has been deleted`);      
   })
   .catch(err => {
      console.log(err);
   })

}, null, true, 'Asia/Jakarta')

module.exports = job