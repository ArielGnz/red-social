const Follow = require("../models/follow");
const User = require("../models/user");

const pruebaFollow = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/follow.js"
    });
}

const save = (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "siguiendo"
    })
}

module.exports = {
    pruebaFollow,
    save,
}