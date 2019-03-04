const express = require("express");
const router = express.Router();
const {
  getAllPostalCode,
  getSinglePostalCode,
  createPostalCode,
  updatePostalCode,
  deletePostalCode
} = require("../controllers/postalCodeController");

router.get("/", getAllPostalCode);
router.get("/:id", getSinglePostalCode);
router.post("/", createPostalCode);
router.put("/:id", updatePostalCode);
router.delete("/:id", deletePostalCode);

module.exports = router;
