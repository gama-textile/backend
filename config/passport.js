const passport = require("passport");
const async = require("async");
const { Authentication, Customer } = require("../models");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var googleController = require("../controllers/googleController");

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "900213939108-s79a3rke2dqqmks9mo12cd54t65bl2u0.apps.googleusercontent.com",
      clientSecret: "scE3kuh5g6HBJY1dNA8MhgWX",
      callbackURL: "http://localhost:3000/api/auths/google/callback",
      profileFields: ["id", "emails", "name"]
    },
    function(accessToken, refreshToken, profile, done) {
      Customer.create({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        gender: profile.gender
      })
        .then((customer) => {
          return done();
        })
        .catch((err) => {
          return done();
        });
      // var customerId = "";
      // const tasks = [
      //   function insertCustomer() {
      //     Customer.create({
      //       firstName: profile.name.givenName,
      //       lastName: profile.name.familyName,
      //       gender: profile.gender
      //     })
      //       .then((customer) => {
      //         console.log("Berhasil insert data");
      //         customerId = customer.id;
      //       })
      //       .catch((err) => {
      //         console.log("Gagal " + err);
      //       });
      //   },
      //   function insertAuthentication() {
      //     Authentication.create({
      //       customerId: customerId
      //     })
      //       .then((authentication) => {
      //         console.log("Berhasil insert data");
      //       })
      //       .catch((err) => {
      //         console.log("Gagal " + err);
      //       });
      //   }
      // ];
      // async.series(tasks, (err, results) => {
      //   if (err) {
      //     return next(err);
      //   }
      //   return res.json(results);
      // });
    }
  )
);

module.exports = passport;

// Bank.create({ name, nomorRekening })
// .then((bank) => {
//   res.status(201).json({ data: bank, message: "Success create bank" });
// })
// .catch((err) => {
//   console.log(err);
//   res.status(500).json({ message: "Internal server error" });
// });
