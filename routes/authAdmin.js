var express = require("express");
var router = express.Router();
const { auth } = require("../middlewares/auth");
const {
  signin,
  signup,
  me,
  update
} = require("../controllers/authAdminController");

router.get("/me", auth, me);
router.put("/:id", auth, update);
router.post("/signin", signin);
router.post("/signup", auth, signup);

module.exports = router;
