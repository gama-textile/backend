const { Authentication } = require("../models/authentication");
const Op = require("sequelize").Op;
const passport = require("../config/passportGmail");

exports.gmail_link = (req, res) => {
  res.render("gmail_link");
};

exports.gmail_success = (req, res) => {
  res.render("gmail_success");
};

exports.gmail_login = passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login", "email"]
});

(exports.gmail_callback = passport.authenticate("google", {
  failureRedirect: "/api/gmail-link"
})),
  function(req, res) {
    res.redirect("/api/auths/gmail-success");
  };
