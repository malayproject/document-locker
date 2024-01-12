const passport = require("passport");
const redirectUri = process.env.REDIRECT_URI + "/oauth2/redirect/google";

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
      res.redirect(
        // "https://main--beautiful-llama-b6d890.netlify.app/oauth2/redirect/google"
        redirectUri
      );
    }
  );
};
