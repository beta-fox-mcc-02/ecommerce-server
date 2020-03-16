// require('dotenv').config()
const app = require('../app')
const http = require('http')
const server = http.createServer(app)

server.listen(process.env.PORT, () => {
  console.log(`connected with love and gawl to port ${process.env.PORT}`)
})