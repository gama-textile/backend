var express = require("express");
var router = express.Router();
var {
  getAllAddress,
  getAllAddreesSingleCustomer,
  createAddress,
  updateAddress,
  deleteAddress
} = require("../controllers/addressController");

/* get all address */
router.get("/", getAllAddress);

/* get all address single customer */
router.get("/:customerId", getAllAddreesSingleCustomer);

/* create address */
router.post("/", createAddress);

/* update single customer address */
router.put("/:customerId", updateAddress);

/* delete address */
router.delete("/:id", deleteAddress);

module.exports = router;
