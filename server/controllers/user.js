const User = require("../models/user");


const register = (req, res) => {
    
    let params = req.body;

    if(params.name && params.email && params.password )


    return res.status(200).json({
        message: "Accion de registro"
    });
    
}

module.exports = {
    register
}