const jwt = require("jwt-simple");
const moment = require("moment");

const secret = "clave_secreta_red-social";

const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()

    };

    return jwt.encode(payload, secret);
}

module.exports = {
    createToken, 
    secret
}