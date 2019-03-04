const express = require("express");
const router = express.Router();

const {
  viewProductInbound,
  createProductInbound,
  getSingleProductInbound,
  updateProductInbound,
  deleteProductInbound
} = require("../controllers/productIndboundController");

router.get("/", viewProductInbound);
router.get("/:id", getSingleProductInbound);
router.post("/", createProductInbound);
router.put("/:id", updateProductInbound);
router.delete("/:id", deleteProductInbound);

module.exports = router;
