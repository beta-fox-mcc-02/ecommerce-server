const app = require('../app')
const http = require('http')
const server = http.createServer(app)

server.listen(3000, _=>{
  console.log('connected on 3000')
})