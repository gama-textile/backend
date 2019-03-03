const express = require("express");
const router = express.Router();

const { viewProductInbound } = require("../controllers/productIndbound");

router.get("/", viewProductInbound);

module.exports = router;
