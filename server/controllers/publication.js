const publication = require("../models/publication");
const Publication = require ("../models/publication");

const pruebaPublication = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/publication.js"
    });
}
const save = (req, res) => {

    const params = req.body;

    if(!params.text){
        return res.status(400).send({
            status: "Error",
            message: "No hay texto en la publicacion"
        });
    }

    let newPublication = new Publication(params);
    newPublication.user = req.user.id;

    newPublication.save((error, publicationStored) => {
        if(error || !publicationStored){
            return res.status(400).send({
                status: "error", 
                message: "No se ha guardado la publicación." });
        }

        return res.status(200).send({
            status: "success",
            message: "Publicación guardada",
            publicationStored
        });
    })

}

module.exports = {
    pruebaPublication,
    save,
}