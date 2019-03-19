const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers.token, "secret");
      if (decoded) {
        req.user = decoded.user;
        next();
      } else {
        res.status(403).json({
          message: "Invalid Token"
        });
      }
    } catch (err) {
      res.status(403).json({
        message: "Invalid Token"
      });
    }
  }
};
