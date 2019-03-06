var express = require("express");
var router = express.Router();
var {
  getAllDistrict,
  createDistrict,
  getSingleDistrict,
  updatedDistrict,
  deleteDistrict
} = require("../controllers/districtController");

router.get("/", getAllDistrict);
router.post("/", createDistrict);
router.get("/:id", getSingleDistrict);
router.put("/:id", updatedDistrict);
router.delete("/:id", deleteDistrict);

module.exports = router;
