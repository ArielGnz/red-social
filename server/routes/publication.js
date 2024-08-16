const express = require("express");
const router = express.Router();
const publicationController = require("../controllers/publication");
const check = require("../middlewares/auth");

//router.get("/prueba-publication", publicationContoller.pruebaPublication);
router.post("/save", check.auth, publicationController.save);

module.exports = router;