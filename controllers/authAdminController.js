const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signin = (req, res) => {
  /*
   *POST api/auth-admin/signin
   * this function signin or login
   */
  const { username, password } = req.body;
  User.findOne({
    where: {
      username: username
    }
  }).then((user) => {
    if (user) {
      const checkPassword = bcrypt.compareSync(password, user.password); // true
      if (checkPassword) {
        const token = jwt.sign(
          {
            user: {
              id: user.id,
              username: user.username
            }
          },
          "secret"
        );
        res.status(200).json({
          message: "Success Signin",
          data: { token, role: user.role }
        });
      } else {
        res.status(403).json({
          message: "Invalid Signin"
        });
      }
    } else {
      res.status(403).json({
        message: "Invalid Signin"
      });
    }
  });
};

exports.signup = (req, res) => {
  const { username, password, name, role } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  console.log(username);
  User.create({
    username,
    password: hashPassword,
    name,
    role
  })
    .then((user) => {
      res.status(201).json({
        message: "Success Create User",
        data: user
      });
    })
    .catch((err) => {
      if (err.errors[0].message) {
        const message = err.errors[0].message;
        res.status(403).json({
          message: message
        });
      } else {
        res.status(500).json({
          message: "Something Went Wrong"
        });
      }
    });
};
