const express = require("express");
const router = express.Router();
const { Authentication } = require("../models");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const Op = require("sequelize").Op;
var passport = require("passport");

// Load Models
var {
  facebook_link,
  facebook_login,
  facebook_success
} = require("../controllers/facebookController");

// GET gmai link
router.get("/facebook-link", facebook_link);

// Get success redirect
router.get("/facebook-success", facebook_success);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/api/authentications/facebook-link"
  }),
  function(req, res) {
    console.log("gua jalan boy");
    // Successful authentication, redirect home.
    res.redirect("/api/authentications/facebook-success");
  }
);

router.post("/signin", (req, res) => {
  /*
   *POST api/authentications/signin
   * this function signin or login
   */
  const { phoneNumber, password } = req.body;
  Authentication.findOne({
    where: {
      phoneNumber: phoneNumber
    }
  })
    .then((authentication) => {
      if (authentication != null) {
        const checkPassword = bcrypt.compareSync(
          password,
          authentication.password
        );
        if (checkPassword === true) {
          const token = jwt.sign(
            { authentication: authentication },
            "secret_key"
          );
          res
            .status(200)
            .json({ message: "Success Login", data: { token: token } });
        } else {
          res.status(403).json({ message: "Invalid Login" });
        }
      } else {
        res.status(403).json({ message: "Invalid Login" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.post("/signup", (req, res) => {
  /*
   *POST api/authentications/signup
   * this function add customers
   */
  const { phoneNumber, password } = req.body;
  console.log(phoneNumber);
  const hashPassword = bcrypt.hashSync(password, 10);
  Authentication.create({
    phoneNumber: phoneNumber,
    password: hashPassword
  })
    .then((authentication) => {
      console.log(phoneNumber);
      res.status(201).json({
        message: "Success signin customer",
        data: authentication
      });
    })
    .catch((err) => {
      console.log("fuck boy");
      console.log(err);
      res.status(500).json({
        message: "Something Went Wrong"
      });
    });
});

module.exports = router;
