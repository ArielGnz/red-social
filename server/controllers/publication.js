//const publication = require("../models/publication");
const Publication = require("../models/publication");

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

const detail = async (req, res) => {

    try {
        // Sacar id de publicacion de la url
        const publicationId = req.params.id;

        // Find con la condicion del id
        const publicationStored = await Publication.findById(publicationId);

        if (!publicationStored) {
            return res.status(404).send({
                status: "error",
                message: "No existe la publicacion"
            });
        }

        // Devolver respuesta
        return res.status(200).send({
            status: "success",
            message: "Mostrar publicacion",
            publication: publicationStored
        });

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error en la petición"
        });
    }
};

const remove = async (req, res) => {

    try {

        const publicationId = req.params.id;

        const deletePublication = await Publication.deleteOne({ "user": req.user.id, "_id": publicationId });

        if (!deletePublication) {
            return res.status(500).send({
                status: "Error",
                message: "No se ha podido borrar la publicacion"
            })
        };

        return res.status(200).send({
            status: "succes",
            message: "Publicaion eliminada",
            publication: publicationId
        });

    } catch (error) {

        return res.status(500).send({
            status: "Error",
            message: "Error en la peticion de borrado"
        })

    }

}

module.exports = {
    pruebaPublication,
    save,
    detail,
    remove,
}