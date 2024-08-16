//const publication = require("../models/publication");
const Publication = require ("../models/publication");

const pruebaPublication = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/publication.js"
    });
}


const save = async (req, res) => {
    const params = req.body;

    if (!params.text) {
        return res.status(400).send({
            status: "Error",
            message: "No hay texto en la publicacion"
        });
    }

    let newPublication = new Publication(params);
    newPublication.user = req.user.id;

    try {
        const publicationStored = await newPublication.save();
        return res.status(200).send({
            status: "success",
            message: "Publicación guardada",
            publicationStored
        });
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "No se ha guardado la publicación."
        });
    }
};


module.exports = {
    pruebaPublication,
    save,
}