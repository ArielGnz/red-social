const Follow = require("../models/follow");
const User = require("../models/user");

const pruebaFollow = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/follow.js"
    });
}

const save = (req, res) => {

    // Recoger datos
    const params = req.body;

    // Obtener id del usuario identificado
    const identity = req.user;

    // Crear objeto con el modelo follow
    let userToFollow = new Follow({
        user: identity.id,
        followed: params.followed
    });

    // Guardar objeto en BBDD
    userToFollow.save((error, followStored) => {
        if(error || !followStored){
            return res.status(500).send({
                status: "Error",
                message: "No se ha podido seguir al usuario"
            });
        }
    })

    return res.status(200).send({
        status: "success",
        message: "siguiendo"
    })
}

module.exports = {
    pruebaFollow,
    save,
}