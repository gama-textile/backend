const express = require("express");
const router = express.Router();
const {
  index,
  create,
  find,
  update,
  destroy
} = require("../controllers/supplierController");

router.get("/", index);
router.post("/", create);
router.get("/:id", find);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
