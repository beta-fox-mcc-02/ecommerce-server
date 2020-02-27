const app = require('../app')
const http = require('http')
const server = http.createServer(app)
const PORT = process.env.PORT || 4000

server.listen(PORT, _ => {
  console.log('connected on', PORT)
})
