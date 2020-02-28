const app = require('../app')
// const http = require('http')
// const server = http.createServer(app)
const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
  console.log('conected on port 3000')
})