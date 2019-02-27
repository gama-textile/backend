var express = require("express");
var router = express.Router();
var passport = require("passport");

// Load controller googleController
const {
  gmail_link,
  gmail_success,
  gmail_login
} = require("../controllers/googleController");

// Load controller facebookController
const {
  facebook_link,
  facebook_login,
  facebook_success
} = require("../controllers/facebookController");

//Load controller authController
var { signup, signin } = require("../controllers/authController");

/* POST create data singin phoneNumber */
router.post("/signup", signup);
/* POST singin phoneNumber */
router.post("/signin", signin);

// GET gmai link
router.get("/gmail-link", gmail_link);
// Get success redirect
router.get("/gmail-success", gmail_success);
// GET /auth/google
router.get("/google", gmail_login);
// GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/gmail-link"
  }),
  function(req, res) {
    res.redirect("/api/auth/gmail-success");
  }
);

// GET facebook link
router.get("/facebook-link", facebook_link);
// Get success redirect
router.get("/facebook-success", facebook_success);
// GET /auth/facebook
router.get("/facebook", facebook_login);
// GET /auth/google/callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/api/auth/facebook-link"
  }),
  function(req, res) {
    console.log("masuk");
    // Successful authentication, redirect home.
    res.redirect("/api/auth/facebook-success");
  }
);

module.exports = router;
