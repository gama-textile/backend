var express = require("express");
var router = express.Router();
var {
  getAllDProvince,
  createProvince,
  getSingleProvince,
  updatedProvince,
  deleteProvince
} = require("../controllers/provinceController");

router.get("/", getAllDProvince);
router.post("/", createProvince);
router.get("/:id", getSingleProvince);
router.put("/:id", updatedProvince);
router.delete("/:id", deleteProvince);

module.exports = router;
