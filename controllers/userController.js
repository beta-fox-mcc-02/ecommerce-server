const { User } = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

class userController {

  static register(req, res, next) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      admin: true
    })
      .then(data => {
        var token = jwt.sign({ id: data.id }, process.env.SECRET);
        let name = data.name;
        res.status(201).json({ token, name });
      })
      .catch(next);
  }

  static login(req, res, next) {
    console.log('sampe sini', req.body);
    
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(data => {
        if (data) {
          let dehash = bcrypt.compareSync(req.body.password, data.password);
          if (dehash) {
            var token = jwt.sign({ id: data.id }, process.env.SECRET);
            let name = data.name;
            res.status(201).json({ token, name });
          } else {
            throw {
              message: "wrong password/email",
              status: 404
            };
          }
        } else {
          throw {
            message: "wrong password/email",
            status: 404
          };
          // res.status(500).json("wrong password/email");
        }
      })
      .catch(err => next(err));
  }
}

module.exports = userController;
