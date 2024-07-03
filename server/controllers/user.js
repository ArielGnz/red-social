const User = require("../models/user");


const register = (req, res) => {
    
    let params = req.body;

    if(!params.name || !params.email || !params.password || !params.surname || !params.nick ){
        return res.status(400).json({
            status: "error",
            message: "Faltan Datos"
        })
    }

    let userSave = new User(params)


    return res.status(200).json({
        status: "success",
        message: "Accion de registro",
        userSave
    });
    
}

module.exports = {
    register
}