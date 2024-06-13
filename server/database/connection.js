
const mongose = require("mongose");

const connection = async() => {

    try {
        await mongose.connect("mongodb://localhost:27017/red-social");
        console.log('Conectado a la DB')

    } catch (error) {
        console.log(error);
        throw new Error("Error al conectar a la base de Datos");
    }
}

module.exports = {
    connection
};