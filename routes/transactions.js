const express = require("express");
const router = express.Router();

const {
  getAlltransaction,
  getAllTransactionSingleCustomer,
  createTransaction
} = require("../controllers/transactionController");

/* get all transaction */
router.get("/", getAlltransaction);

/* get all transaction single customer */
router.get("/:customerId", getAllTransactionSingleCustomer);

/* create transaction */
router.post("/", createTransaction);

module.exports = router;
