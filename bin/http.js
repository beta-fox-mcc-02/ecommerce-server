const app = require("../app");
// const http = require("http");
// const server = http.createServer(app); // instance dari http
const port = process.env.PORT || 3000;
// instance akan di reuse
// var cors = require("cors");
// app.use(cors());
app.listen(port, () => {
  console.log("listening on ", port);
});
