
const app = require('../app')
// const server = http.createServer(app) // instance dari http
// instance akan di reuse 

server.listen(3000, () => {
  console.log('konek ke 3000')
})