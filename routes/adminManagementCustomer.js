const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { getAllCustomer } = require("../controllers/customerController");

router.get("/", auth, getAllCustomer);

module.exports = router;
