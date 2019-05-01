const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
  getAllCustomer,
  getSingleCustomer,
  getAllSingleCustomer
} = require("../controllers/customerController");

const {
  getAllAddreesSingleCustomer
} = require("../controllers/addressController");

const {
  getAllTransactionSingleCustomer
} = require("../controllers/transactionController");

router.get("/", auth, getAllCustomer);
router.get("/:id", auth, getSingleCustomer);
router.get("/:customerId/customer", auth, getAllSingleCustomer);

/* get all address single customer */
router.get("/address/:customerId/customer", auth, getAllAddreesSingleCustomer);

/* get all transaction single customer */
router.get(
  "/transaction/:customerId/customer",
  auth,
  getAllTransactionSingleCustomer
);

module.exports = router;
