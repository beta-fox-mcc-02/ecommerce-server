const app = require('../app')
const http = require('http')
const server = http.createServer(app) // instance dari http
// instance akan di reuse 

server.listen(PORT, () => {
  console.log('listening to ', PORT)
})
