const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UsersModel = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "dfsfs",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/oauth2/redirect/google",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("AT", accessToken);
      console.log("RT", refreshToken);
      console.log("P", profile);
      console.log("CB", done);
      UsersModel.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new UsersModel({ googleId: profile.id, googleProfile: profile })
            .save()
            .then((user) => done(null, user));
        }
      });
      // cb();
    }
  )
);
