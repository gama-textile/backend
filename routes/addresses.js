var express = require("express");
var router = express.Router();
var {
  getAllAddress,
  getAllAddreesSinggleCustomer,
  createAddress,
  updateAddress,
  deleteAddress
} = require("../controllers/addressController");

router.get("/", getAllAddress);

router.get("/:customerId", getAllAddreesSinggleCustomer);

router.post("/", createAddress);

router.put("/:id", updateAddress);

router.delete("/:id", deleteAddress);

module.exports = router;
