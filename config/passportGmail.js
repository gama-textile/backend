const passport = require("passport");
const { Authentication, Customer } = require("../models");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

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
      console.log(profile);
      Authentication.findOne({ where: { email: profile.emails[0].value } })
        .then((authentication) => {
          if (authentication) {
            return done(null, authentication);
          } else {
            Customer.create({
              id: profile.id,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              gender: profile.gender
            }).then((customer) => {
              Authentication.create({
                customerId: profile.id,
                email: profile.emails[0].value
              }).then((authentication) => {
                return done(null, authentication);
              });
            });
          }
        })
        .catch((err) => {
          return done(err, false);
        });
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

module.exports = passport;
