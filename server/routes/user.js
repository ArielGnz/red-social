
const express = require("express");
const multer = require("multer");
const router = express.Router();
const userController = require("../controllers/user");
const check = require("../middlewares/auth")

router.get("/prueba-usuario", check.auth, userController.pruebaUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile/:id", check.auth, userController.profile);
router.get("/list/:page?", check.auth, userController.list);
router.put("/update", check.auth, userController.update);
router.post("/upload",check.auth, userController.upload);

module.exports = router;
