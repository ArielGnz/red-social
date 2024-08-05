const Follow = require("../models/follow");
const User = require("../models/user");

const pruebaFollow = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/follow.js"
    });
}

const save = async (req, res) => {
    try {
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
        const followStored = await userToFollow.save();

        if (!followStored) {
            throw new Error("No se ha podido seguir al usuario");
        }

        return res.status(200).send({
            status: "success",
            identity: req.user,
            follow: followStored,
        });
    } catch (error) {
        return res.status(500).send({
            status: "Error",
            message: error.message || "Error al seguir al usuario"
        });
    }
}

const unfollow = (req, res) => {
    return res.status(200).send({
        status: "Succes",
        identity: req.user,
        message: "Ha dejado de seguir al usuario"
    })
}

module.exports = {
    pruebaFollow,
    save,
    unfollow,
}