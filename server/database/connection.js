
const mongose = require("mongose");

const connection = async() => {
    try {
        await mongose.connect("mongodb://localhost:27017/red-social");
    } catch (error) {
        console.log(error);
        throw new Error("Error al conectar a la base de Datos");
    }
}