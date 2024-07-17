const jwt = require("jwt-simple");
const moment = require("moment");

// importamos clave secreta
const libjwt = require("../services/jwt");
const secret = libjwt.secret; 

exports.auth = (req, res, next) => {

    if(!req.headers.authorization){
        return res.status(403).send({
            status: "Error",
            message: "La peticion no contine la cabecera de auth"
        });
    }
    
    // Limpiamos el Token
    let token = req.headers.authorization.replace(/['"]+/g, '');

    // Decodificando el Token 
    try{
        let payload = jwt.decode(token, secret);
        
        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                status: "Error",
                message: "Token experiado"
            })
        }

        req.user = payload;

    }catch(error){
        return res.status(404).send({
            status: "Error",
            message: "Token invalido",
            error
        })
    }

    next();
}

