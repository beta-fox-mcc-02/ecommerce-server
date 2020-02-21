const authorizationAdminOrMaster = (req, res, next) => {
  if (req.decoded.user_role === 'admin' || req.decoded.user_role === 'master') {
    next();
  } else {
    next({
      status: 401,
      message: 'Unauthorized',
  });
  }
}

const authorizationMaster = (req, res, next) => {
  if (req.decoded.user_role === 'master') {
    next();
  } else {
    next({
      status: 401,
      message: 'Unauthorized',
  });
  }
}

module.exports = {
  authorizationAdminOrMaster,
  authorizationMaster,
}
