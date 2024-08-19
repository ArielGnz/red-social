const express = require("express");
const multer = require("multer");
const router = express.Router();
const publicationController = require("../controllers/publication");
const check = require("../middlewares/auth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/publications/")
    },
    filename: (req, file, cb) => {
        cb(null, "avatar-"+Date.now()+"-"+file.originalname);
    }
});

const uploads = multer({storage});

router.get("/pruebaPublication", publicationController.pruebaPublication);
router.post("/save", check.auth, publicationController.save);
router.get("/detail/:id", check.auth, publicationController.detail);
router.delete("/remove/:id", check.auth, publicationController.remove);
router.get("/user/:id/:page?", check.auth, publicationController.user);

module.exports = router;