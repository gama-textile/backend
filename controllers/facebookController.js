const { Authentication } = require("../models/authentication");
const Op = require("sequelize").Op;
const passport = require("../auth/passportFacebook");

exports.facebook_link = (req, res) => {
  res.render("facebook_link");
};

exports.facebook_success = (req, res) => {
  res.render("facebook_success");
};

exports.facebook_login = passport.authenticate("facebook");

(exports.facebook_callback = passport.authenticate("facebook", {
  failureRedirect: "/api/auth/facebook-link"
})),
  function(req, res) {
    console.log("masuk");
    // Successful authentication, redirect home.
    res.redirect("/api/auth/facebook-success");
  };

// exports.gmail_login = passport.authenticate("google", {
//   scope: ["https://www.googleapis.com/auth/plus.login", "email"]
// });

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
// router.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "/",
//     failureRedirect: "/login"
//   })
// );
