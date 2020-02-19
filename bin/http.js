const app = require('../app.js')
const cors = require('cors')
const PORT = process.env.PORT || 3000

app.use(cors())
app.listen (PORT, () => console.log(`LISTENING ON PORT ${PORT}`))