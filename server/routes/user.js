
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const check = require("../middlewares/auth")

router.get("/prueba-usuario", check.auth, userController.pruebaUser);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
