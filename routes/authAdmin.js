var express = require("express");
var router = express.Router();
const { auth } = require("../middlewares/auth");
const { signin, signup } = require("../controllers/authAdminController");

router.post("/signin", signin);
router.post("/signup", auth, signup);

module.exports = router;
