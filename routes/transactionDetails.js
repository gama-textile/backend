const express = require("express");
const router = express.Router();

const {
  getAlltransactionDetails,
  getAllTransactionSingleTransaction,
  createTransactionDetail
} = require("../controllers/transactionDetailContoller");

/* get all transaction detail */
router.get("/", getAlltransactionDetails);

/* get all transaction detail */
router.get("/:transactionId/transaction", getAllTransactionSingleTransaction);

/*post transaction detail */
router.post("/", createTransactionDetail);

module.exports = router;
