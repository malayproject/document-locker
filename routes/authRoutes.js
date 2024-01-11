const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get(
    "/oauth2/redirect/google",
    passport.authenticate("google"),
    (req, res) => {
      res.header("Access-Control-Allow-Methods", "*");
      res.header("Access-Control-Allow-Origin", "*");
      res.redirect("http://localhost:3000/oauth2/redirect/google");
    }
  );
};
