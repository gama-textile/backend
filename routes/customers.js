var express = require("express");
var router = express.Router();
var {
  getSingleCustomer,
  getAllCustomer
} = require("../controllers/customerController");

router.get("/", getAllCustomer);
router.get("/:id", getSingleCustomer);

module.exports = router;
