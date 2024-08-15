const express = require("express");
const router = express.Router();
const PublicationController = require("../controllers/publication");
const check = require("../middlewares/auth");

router.get("/prueba-publication", PublicationContoller.pruebaPublication);
router.post("/save", check.auth, PublicationController.save);

module.exports = router;