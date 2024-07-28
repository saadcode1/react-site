const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors");
const app = express();
const port = 8888;
const flash=require("connect-flash");
const User=require("./models/user");
const session = require('express-session');
const passport = require("passport");
const localStrategy = require("passport-local");
const bodyParser = require('body-parser');
const cookie=require("cookies");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use(cors());
const userRoute=require("./router/user.js");

main()
  .then(() => {
    console.log("connections successfully done");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/instagram');
}



app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currUser = req.user;
    next();
  });

app.use("/",userRoute);

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});  