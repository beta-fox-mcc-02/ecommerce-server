const jwt = require("jsonwebtoken");
const {
  Admin
} = require("../models");
const private_key = "secret";

module.exports = {
  authentication: (req, res, next) => {
    try {
      const token = req.headers.access_token;
      let decoded = jwt.verify(token, private_key);
      Admin.findOne({
          where: {
            id: decoded.data.id
          }
        })
        .then(data => {
          if (data) {
            req.AdminId = data.id;
            // req.Role = data.role
            next();
          } else {
            let errorMsg = {
              err: "Not exist",
              msg: "Admin does not exist"
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