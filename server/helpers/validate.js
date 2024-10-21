const validator = require("validator");

const validate = (params) => {

    let name = !validator.isEmpty(params.name) &&
                validator.isLength(params.name, {min: 3, max: undefined}) &&
                validator.isAlpha(params.name, "es-ES");



    if(!name){
        throw new Error("Error en la validacion del Nombre")
    }
}

module.exports = validate;
