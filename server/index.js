const connection = require("./database/connection");   
const express = require("express");
const cors = require("cors");

connection();

// servidor
const app = express();
const port = 3001;

// config CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//rutas


//listen server
