const express = require("express");
const router = express.Router();
const FollowContoller = require("../controllers/follow");
const check = require("../middlewares/auth");


router.get("/prueba-follow", FollowContoller.pruebaFollow);
router.post("/save", check.auth, FollowContoller.save);
router.delete("/unfollow/:id", check.auth, FollowContoller.unfollow);

module.exports = router;