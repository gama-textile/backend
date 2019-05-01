const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
  getAlltransaction,
  getAllTransactionSingleCustomer,
  getAllTransactionSingleStatus
} = require("../controllers/transactionController");

/* get all transaction */
router.get("/", auth, getAlltransaction);

/* get all transaction single customer */
router.get("/:customerId", auth, getAllTransactionSingleCustomer);

/* get all transaction single customer */
router.get(
  "/:statusTransaction/status-transaction",
  auth,
  getAllTransactionSingleStatus
);

module.exports = router;
