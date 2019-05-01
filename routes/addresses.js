var express = require("express");
var router = express.Router();
var {
  getAllAddress,
  getAllAddreesSingleCustomer,
  createAddress,
  updateAddressCusomers,
  getSingleAddrees,
  updateAddress,
  deleteAddress
} = require("../controllers/addressController");

/* get all address */
router.get("/", getAllAddress);

/* get all address single customer */
router.get("/:customerId/customer", getAllAddreesSingleCustomer);

/* get all address single customer */
router.get("/:id/find", getSingleAddrees);

/* update single customer address */
router.put("/:id/edit", updateAddress);

/* create address */
router.post("/", createAddress);

/* update single customer address */
router.put("/:customerId/customer/edit", updateAddressCusomers);

/* delete address */
router.delete("/:id", deleteAddress);

module.exports = router;
