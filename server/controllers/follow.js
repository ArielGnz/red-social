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

const unfollow = async (req, res) => {
    try {
        // Id usuario
        const userId = req.user.id;

        // Id del usuario que voy a dejar de seguir
        const followId = req.params.id;

        // Encontrar las coincidencias de Id y eliminar el seguimiento
        const followDelete = await Follow.findOneAndDelete({
            user: userId,
            followed: followId 
        });

        if (!followDelete) {
            return res.status(404).send({
                status: "Error",
                message: "No se encontró el seguimiento para eliminar",
                followDelete,
                userId,
                followId,
            });
        }

        return res.status(200).send({
            status: "Success",
            identity: req.user,
            message: "Ha dejado de seguir al usuario"
        });
    } catch (error) {
        return res.status(500).send({
            status: "Error",
            message: "Ha ocurrido un error al dejar de seguir al usuario"
        });
    }
};

const following = (req, res) => {
    return res.status(200).send({
        status: "Success",
        message: "Listados de usuarios que estoy siguiendo"
    });
}

const followers = (req, res) => {
    return res.status(200).send({
        status: "Success",
        message: "Listados de usuarios que me siguen"
    });
}



module.exports = {
    pruebaFollow,
    save,
    unfollow,
    following,
    followers,
}