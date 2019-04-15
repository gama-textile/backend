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
  /*
   *POST api/auth-admin/signup
   * this function signup
   */
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

exports.me = (req, res) => {
  /*
   * GET api/auth-admin/me
   * this function get me
   */
  const { id } = req.user;
  User.findOne({
    where: {
      id: id
    }
  })
    .then((user) => {
      res.status(200).json({
        message: "Success Read User",
        data: user
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something Went Wrong"
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { username, password, name, role } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  User.findOne({
    where: { id: id }
  })
    .then((user) => {
      if (user) {
        user
          .update({
            username,
            password: hashPassword,
            name,
            role
          })
          .then((updatedUser) => {
            delCache("User");
            res.status(200).json({
              message: "Success Update User",
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
      } else {
        res.status(404).json({
          message: "User Not Found"
        });
      }
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
