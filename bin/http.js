if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const app = require('../app')
const http = require('http')
const server = http.createServer(app)
const port = process.env.PORT || 3000

server.listen(port, () => console.log(`Connecting on port ${port}!`))