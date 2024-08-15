const Publication = require ("../models/publication");

const pruebaPublication = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/publication.js"
    });
}
const save = (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "Publicación guardada",
        //publicationStored
    });
}

module.exports = {
    pruebaPublication,
    save,
}