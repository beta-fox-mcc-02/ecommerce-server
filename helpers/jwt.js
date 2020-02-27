const jwt = require('jsonwebtoken');

module.exports = {
    sign: payload => {
        // console.log(process.env.SECRET_KEY);
        
        return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h'});
    }, decode: token => {
        try{
            const decoded = jwt.verify(token, Number(process.env.SECRET_KEY));

            if(decoded) return decoded;
            else return null;
        } catch(err) {
            return err;
        }
    }
}