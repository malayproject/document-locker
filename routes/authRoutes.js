const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get(
    "/oauth2/redirect/google",
    passport.authenticate("google"),
    // (req, res) => {
    //   res.redirect("/current-user");
    // }
    (req, res) => {
      // console.log("============================================");
      // console.log("request headers are ", JSON.stringify(req.headers));
      // console.log("response headers are ", res.getHeaders());
      // console.log("request cookie are ", req.get("cookie"));
      // console.log("Redirect set-cookie is ", res.get("Set-Cookie"));
      //res.header("Set-Cookie", req.get("cookie"));
      // console.log("Redirect set-cookie is ", res.get("Set-Cookie"));
      res.header("Access-Control-Allow-Methods", "*");
      res.header("Access-Control-Allow-Origin", "*");
      res.redirect("http://localhost:3000/oauth2/redirect/google");
    }
  );
};
