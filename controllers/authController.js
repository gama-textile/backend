const express = require("express");
const router = express.Router();
const { Authentication, Customer } = require("../models");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Op = require("sequelize").Op;

exports.signup = (req, res) => {
  /*
   *POST api/authentications/signup
   * this function add customers and authentication
   */
  const {
    firstName,
    lastName,
    customerId,
    email,
    password,
    phoneNumber,
    facebook,
    salt
  } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);
  Authentication.findOne({ where: { phoneNumber: phoneNumber } }).then(
    (auth) => {
      if (auth) {
        res.status(403).json({ message: "phoneNumber sudah terpakai" });
      } else {
        Customer.create({
          firstName,
          lastName
        }).then((customer) => {
          Authentication.create({
            customerId,
            phoneNumber,
            password: hashPassword
          })
            .then((authCreate) => {
              res.status(201).json({
                message: "Success signin customer",
                data: authCreate
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ message: "Something Went Wrong" });
            });
        });
      }
    }
  );
};

exports.signin = (req, res) => {
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
    .then((auth) => {
      if (auth != null) {
        const checkPassword = bcrypt.compareSync(password, auth.password);
        if (checkPassword === true) {
          const token = jwt.sign({ auth: auth }, "secret_key");
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
};

// router.post("/signup", (req, res) => {
//   /*
//    *POST api/authentications/signup
//    * this function add customers
//    */
//   const { phoneNumber, password } = req.body;
//   console.log(phoneNumber);
//   const hashPassword = bcrypt.hashSync(password, 10);
//   Authentication.create({
//     phoneNumber: phoneNumber,
//     password: hashPassword
//   })
//     .then((authentication) => {
//       console.log(phoneNumber);
//       res.status(201).json({
//         message: "Success signin customer",
//         data: authentication
//       });
//     })
//     .catch((err) => {
//       console.log("fuck boy");
//       console.log(err);
//       res.status(500).json({
//         message: "Something Went Wrong"
//       });
//     });
// });

// module.exports = router;
