const User = require("../models/user");


const register = (req, res) => {
    
    let params = req.body;

    if(!params.name || !params.email || !params.password || !params.surname || !params.nick ){
        return res.status(400).json({
            status: "error",
            message: "Faltan Datos"
        })
    }

    let userSave = new User(params);

    User.find({$or: [
        {email: userSave.email.toLowerCase()},
        {nick: userSave.nick.toLowerCase()}
    ]}).exec((error, users) => {
        if (error) return res.status(500).json({status:"error", message:"Ya existe Emial"})
    })


    return res.status(200).json({
        status: "success",
        message: "Accion de registro",
        userSave
    });
    
}

module.exports = {
    register
}