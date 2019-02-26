const { Authentication } = require("../models/authentication");
const Op = require("sequelize").Op;
const passport = require("../config/passport");

exports.gmail_link = (req, res) => {
  res.render("gmail_link");
};

exports.gmail_success = (req, res) => {
  res.render("gmail_success");
};

exports.gmail_login = passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login", "email"]
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
