
const mongoose = require("mongoose");

const connection = async() => {

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/red-social");
        console.log('Conectado a la DB')

    } catch (error) {
        console.log(error);
        throw new Error("Error al conectar a la base de Datos");
    }
}

module.exports = connection;
