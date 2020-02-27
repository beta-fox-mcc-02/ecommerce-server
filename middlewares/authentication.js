const jwt = require("jsonwebtoken");
const {
  User
} = require("../models");
const private_key = "secret";

module.exports = {
  authentication: (req, res, next) => {
    try {
      const token = req.headers.access_token;
      let decoded = jwt.verify(token, private_key);
      // console.log(decoded.payload, "decoded authentication")
      User.findOne({
          where: {
            id: decoded.payload.id
          }
        })
        .then(data => {
          if (data) {
            req.UserId = data.id;
            // console.log(req.UserId, 'req.userid dari authentication')
            next();
          } else {
            let errorMsg = {
              err: "Not exist",
              msg: "User does not exist"
            };
            res.status(404).json(errorMsg);
          }
        })
        .catch(err => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  }
};