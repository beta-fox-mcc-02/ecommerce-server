const app = require('../../app')
const http = require('http')
const server = http.createServer(app)
const port =  3000

server.listen(port, () => 'this server run in port :', port )