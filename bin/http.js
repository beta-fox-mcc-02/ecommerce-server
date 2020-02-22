const app = require("../app");
const http = require("http");
const server = http.createServer(app); // instance dari http
// instance akan di reuse
var cors = require("cors");
app.use(cors());
server.listen(3000, () => {
  console.log("listening on 3000");
});
