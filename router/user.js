const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controller/user");
const isLoggedIn = require("../middleware.js");

router.post("/signin", controller.signin);

router.post("/login", 
  passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), 
  controller.loggedIn
);

router.post("/post",controller.postCreated);
router.get("/logout",controller.loggeOut);

module.exports = router;
