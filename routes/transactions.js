const express = require("express");
const router = express.Router();

const { getAlltransaction } = require("../controllers/transactionController");

router.get("/", getAlltransaction);
// router.get("/:id", getSingleProductInbound);
// router.post("/", createProductInbound);
// router.put("/:id", updateProductInbound);
// router.delete("/:id", deleteProductInbound);

module.exports = router;
