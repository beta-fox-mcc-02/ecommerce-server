const { validateToken } = require('../helpers/jwt');
const { User } = require('../models');

module.exports = (req, res, next) => {
  const { access_token } = req.headers;
  try {
    const decoded = validateToken(access_token);
    req.currentUserId = decoded.id;
    User.findOne({
      where: { id: req.currentUserId }
    })
      .then(user => {
        if (user) next();
        else next({ status: 401, message: 'You Must Register First' });
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};
