const Publication = require ("../models/publication");

const pruebaPublication = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/publication.js"
    });
}

module.exports = {
    pruebaPublication,
}