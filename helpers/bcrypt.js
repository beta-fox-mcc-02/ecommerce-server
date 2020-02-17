const bcrypt = require('bcryptjs');

module.exports = {
    hashSync: (password) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },

    compareSync:(password, hashedPassword) => {
        return bcrypt.compareSync(password, hashedPassword);
    }
}