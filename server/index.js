const connection = require("./database/connection");   
const express = require("express");
const cors = require("cors");
const router = require("./routes/user");
const UserRoutes = require("./routes/user")

connection();

// servidor
const app = express();
const port = 3900;

// config CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//rutas

//app.use(router);

const UserRoutes = require("./routes/");
const PublicationRoutes = require("./routes/");
const FollowRoutes = require("./routes/");

app.use("/api/user", UserRoutes);
app.use("/api/publication", PublicationRoutes)
app.use("/api/follow", FollowRoutes);


//listen server

app.listen(port, () => {
    console.log("Server listening on PORT : ", port)
})