const express = require("express");
const router=express.Router();
const passport=require("passport");
const controller=require("../controller/user");
const isLoggedIn=require("../middleware.js");
router.post("/signin",controller.signin);

router.post("/login",isLoggedIn,passport.authenticate("local",{
    failureFlash: true
    }), controller.loggedIn);

router.post("/post",isLoggedIn,controller.postCreated);
module.exports=router;