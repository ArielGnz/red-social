
const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    // Registro de usuario
    let params = req.body;

    // Comprobacion de que llegan los parametros
    if (!params.name || !params.email || !params.password || !params.surname || !params.nick) {
        return res.status(400).json({
            status: "error",
            message: "Faltan Datos"
        });
    }

    try {
        const users = await User.find({
            $or: [
                { email: params.email.toLowerCase() },
                { nick: params.nick.toLowerCase() }
            ]
        }).exec();

        if (users && users.length >= 1) {
            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe"
            });
        }

        // Cifrar contraseña
        let pwd = await bcrypt.hash(params.password, 10);
        params.password = pwd;

        // Crear el objeto de usuario
        let userSave = new User(params);

        // Guardar usuario en DB
        const userStored = await userSave.save();

        // Devolver el resultado
        return res.status(200).json({
            status: "success",
            message: "Usuario registrado correctamente",
            user: userStored
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

const login = (req, res) => {
    // Recoger parametros
    let params = req.body;

    if(!params.email || !params.password){
        return res.status(400).send({
            status: "error",
            message: "Faltan datos por enviar"
        })
    }

    // Buscar en la DB si existe usuario
    User.findOne({email: params.email}).exec((error, user) => {
        if(error || !user) return res.status(404).send({status: "error", message:"No existe el usuario"});

        // Comprobar contraseña
        const pwd = bcrypt.compareSync(params.password, user.password);

        if(!pwd) {
            return res.status(400).send({
                status: "error",
                mesagge: "Error en datos de ingreso"
            })
        }

        // Devolver datos de usuario
    })
}

module.exports = {
    register
};
