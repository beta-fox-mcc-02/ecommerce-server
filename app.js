if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require('cors')
// const PORT = 3000;
const adminRoute = require("./routes/admin");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user.js");
const cartRoute = require('./routes/cart.js')
const errorHandler = require("./middlewares/errorHandler");
const {
  User
} = require("./models");
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Home page"
  });
});

app.use("/admin", adminRoute);

app.use("/admin", productRoute);

app.use(userRoute)

app.use(cartRoute)

app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log("listening to port", PORT);
// });

module.exports = app;