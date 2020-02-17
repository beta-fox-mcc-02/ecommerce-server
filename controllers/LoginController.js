const { User } = require('../models');
const { validatePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');

class LoginController {
  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: { email }
    })
      .then(user => {
        if (user) {
          const correctPassword = validatePassword(password, user.password);
          if (correctPassword) {
            const payload = { id: user.id };
            const access_token = createToken(payload);
            res.status(200).json({ access_token });
          } else {
            res.status(400).json({ message: 'Invalid Email/Password' });
          }
        } else {
          res.status(400).json({ message: 'Invalid Email/Password' });
        }
      })
      .catch(next)
  }
}

module.exports = LoginController;