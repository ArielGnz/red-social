const connection = require("./database/connection");   
const express = require("express");
const cors = require("cors");

connection();

// servidor
const app = express();
const port = 3900;

// config CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//rutas


//listen server

app.listen(port, () => {
    console.log("Server listening on PORT : ", port)
})