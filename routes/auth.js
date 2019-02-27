var express = require("express");
var router = express.Router();
var passport = require("passport");

// Load Models
var {
  gmail_link,
  gmail_success,
  gmail_login,
  gmail_callback
} = require("../controllers/googleController");

// GET gmai link
router.get("/gmail-link", gmail_link);

// Get success redirect
router.get("/gmail-success", gmail_success);

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get("/google", gmail_login);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get("/google/callback", gmail_callback);

module.exports = router;
