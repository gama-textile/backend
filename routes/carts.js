var express = require("express");
var router = express.Router();
var {
  getAllCart,
  getSingleCart,
  getAllCartSingleCustomer,
  createCart,
  updateCart,
  deleteCart
} = require("../controllers/cartController");

router.get("/", getAllCart);
router.get("/:customerId/customer", getAllCartSingleCustomer);
router.get("/:id", getSingleCart);
router.post("/", createCart);
router.put("/:id", updateCart);
router.delete("/:id", deleteCart);

module.exports = router;
