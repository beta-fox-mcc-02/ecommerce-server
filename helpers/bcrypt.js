const bcrypt = require('bcryptjs');

hash = password => {
    let salt = bcrypt.genSaltSync(Number(process.env.SALT_NUMBER));
    return bcrypt.hashSync(password, salt);
}

compare = (pass, hashedPass) => {
    return bcrypt.compareSync(pass, hashedPass);
}

module.exports = { hash, compare };