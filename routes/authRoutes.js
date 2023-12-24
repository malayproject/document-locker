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
      console.log("============================================");
      console.log("Redirect set-cookie is ", res.get("Set-Cookie"));
      // res.header("Set-Cookie", req.get("Set-Cookie"));
      // res.redirect("http://localhost:3000/oauth2/redirect/google");
    }
  );
};
