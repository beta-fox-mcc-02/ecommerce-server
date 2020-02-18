const jwt = require('jsonwebtoken');
const secret = 'shshsh';

const generateToken = (payload) => {
    return jwt.sign(payload, secret);
}

const verifyToken = (token) => {
    return jwt.verify(token, secret);
}

module.exports = { generateToken, verifyToken };