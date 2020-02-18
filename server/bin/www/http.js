const app = require('../../app')

//PORT
const PORT = process.env.PORT || 3000

//listener
app.listen(PORT, () => console.log("I LOVE YOU", PORT))