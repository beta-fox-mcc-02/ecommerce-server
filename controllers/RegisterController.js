const { User } = require('../models');
const { createToken } = require('../helpers/jwt');

class RegisterController {
  static register(req, res, next) {
    const { email, password, role } = req.body;
    const data = { email, password, role };
    User.create(data)
      .then(user => {
        const payload = { id: user.id };
        const access_token = createToken(payload);
        res.status(201).json({ access_token });
      })
      .catch(next)
  }
}

module.exports = RegisterController;