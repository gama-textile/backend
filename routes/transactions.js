const express = require("express");
const router = express.Router();

const {
  getAlltransaction,
  createTransaction
} = require("../controllers/transactionController");

router.get("/", getAlltransaction);
router.post("/", createTransaction);

module.exports = router;
