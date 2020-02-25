if (process.env.NODE_ENV === "development") {
    require("dotenv").config();
}
const PORT = process.env.PORT || 3000;
const app = require("../app")


app.listen(PORT, () => {
    console.log('listening to port ', PORT);
});