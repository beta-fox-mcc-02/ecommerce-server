const app = require('../app')
const http = require('http')
const server = http.createServer(app) // instance dari http
// instance akan di reuse
const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log(`konek ke ${PORT}`)
})