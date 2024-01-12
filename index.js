const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const corsMiddleware = require("./middlewares/corsMiddleware.js");
const app = express();
require("./models/User.js");
require("./models/File.js");
require("./models/Tag.js");

const UserModel = mongoose.model("users");
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI);

// json middleware
app.use(express.json());

app.use(
  cookieSession({
    name: "mysession" /* by default*/,
    keys: [process.env.cookieKey1, process.env.cookieKey2],
    maxAge: 4 * 60 * 60 * 1000, // 4 hrs
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./auth/auth");
require("./routes/authRoutes")(app);
require("./routes/awsRoutes")(app);
require("./routes/tagRoutes")(app);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id).then((user) => done(null, user));
});

app.get(
  "/current-user",
  // passport.authenticate("google"),
  corsMiddleware,
  (req, res) => {
    res.send(req.user);
  }
);

app.get("/api/logout", corsMiddleware, (req, res) => {
  req.logout();
  res.send("fddjfgsj");
});

app.get("/health", (req, res) => {
  res.send("server running");
});

/***************************************************************** */

/****************************************************************** */

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
