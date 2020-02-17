const jwt = require('jsonwebtoken');

module.exports = {
    generateToken: (payload) => {
        console.log(process.env.PRIVATE_KEY)
        return jwt.sign(payload, process.env.PRIVATE_KEY);
    },

    verifyToken: (token) => {
        return jwt.verify(token, process.env.PRIVATE_KEY);
    }
}