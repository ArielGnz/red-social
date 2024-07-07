// const User = require("../models/user");
// const bcrypt = require("bcrypt");


// const register = async(req, res) => {
    
//     // Registro de usuario
//     let params = req.body;

//     // Comprobacion de que llegan los parametros
//     if(!params.name || !params.email || !params.password || !params.surname || !params.nick ){
//         return res.status(400).json({
//             status: "error",
//             message: "Faltan Datos"
//         })
//     }

//     User.find({
//         $or: [
//         {email: params.email.toLowerCase()},
//         {nick: params.nick.toLowerCase()}
//         ]

//     }).exec(async (error, users) => {

//             if (error) return res.status(500).json({status:"error", message:"Ya existe Emial"})
        
//             if(users && users.length >=1){
//                 return res.status(200).send({
//                     status: "success",
//                     message: "El usuario ya esxiste"
//                 });
//             }


//             //  cifrar contraseña
//             let pwd = await bcrypt.hash(params.password, 10);
//             params.password = pwd;

//             // Creo el objeto de usuario
//             let userSave = new User(params);

//             //  Guardar usuario en DB
//             userSave.save((err, userStored) => {
//                 if (err || !userStored) return res.status(500).send({status:"error", message:"Error al guardar el usuario"})
            
//                  // Devuelvo el resultado
//                 return res.status(200).json({
//                     status: "success",
//                     message: "Accion de registro",
//                     userSave
//                 });
//             });
           
//         })

   
    
   
    
// }

// module.exports = {
//     register
// }

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

module.exports = {
    register
};
