const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./models/User.js");
const app = express();
const UserModel = mongoose.model("users");
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI);
app.use(
  cookieSession({
    // name: 'session',  /* by default*/
    keys: [process.env.cookieKey1, process.env.cookieKey2],
    maxAge: 4 * 60 * 60 * 1000, // 4 hrs
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./auth/auth");
require("./routes/authRoutes")(app);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id).then((user) => done(null, user));
});

app.get("/current-user", (req, res) => {
  console.log("current-user req", req.user);
  res.send(req.user);
});

app.get("/api/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});

app.get("/", (req, res) => {
  // console.log("REQ-BODY", req.session);
  // console.log("hello");
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
