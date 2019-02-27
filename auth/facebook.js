var passport = require("passport");
const { Authentication, Customer } = require("../models");
var FacebookStrategy = require("passport-facebook").Strategy;
// var facebookController = require("../controllers/facebookController");

passport.use(
  new FacebookStrategy(
    {
      clientID: 323544641841940,
      clientSecret: "cde32e220a26bef529f809663239e084",
      callbackURL:
        "http://localhost:3000/api/authentications/facebook/callback",
      profileFields: ["id", "emails", "name"]
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      Authentication.findOne({ where: { facebook: profile.emails[0].value } })
        .then((authentication) => {
          if (authentication) {
            return done(null, authentication);
          } else {
            Customer.create({
              // id: profile.id,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              gender: profile.gender
            }).then((customer) => {
              Authentication.create({
                customerId: customer.id,
                facebook: profile.emails[0].value
              }).then((authentication) => {
                return done(null, authentication);
              });
            });
          }
        })
        .catch((err) => {
          return done(err, false);
        });

      // console.log(profile);
      // Customer.create({
      //   firstName: profile.name.givenName,
      //   lastName: profile.name.familyName,
      //   gender: profile.gender
      // })
      //   .then((customer) => {
      //     return done(null, customer);
      //   })
      //   .catch((err) => {
      //     return done(err, customer);
      //   });
      // User.findOrCreate(
      //   { name: profile.displayName },
      //   { name: profile.displayName, userid: profile.id },
      //   function(err, user) {
      //     if (err) {
      //       return done(err);
      //     }
      //     done(null, user);
      //   }
      // );
    }
  )
);

passport.serializeUser(function(customer, done) {
  done(null, customer.id);
});

passport.deserializeUser(function(id, done) {
  Customer.find({ where: { id: id } })
    .then(function(customer) {
      done(null, customer);
    })
    .catch(function(err) {
      done(err, null);
    });
});

// const passport = require("passport");
// const async = require("async");
// const { Authentication, Customer } = require("../models");
// var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
// var googleController = require("../controllers/googleController");

module.exports = passport;
