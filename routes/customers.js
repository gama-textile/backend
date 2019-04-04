var express = require("express");
var router = express.Router();
var { getSingleCustomer } = require("../controllers/customerController");

router.get("/:id", getSingleCustomer);

module.exports = router;
