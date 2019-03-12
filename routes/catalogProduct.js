const express = require("express");
const router = express.Router();
const {
  getAllCatalogProducts,
  getSingleCatalogProduct,
  createCatalogProducts,
  updateCatalogProduct,
  deleteCatalogProduct,
  getAllSupplier,
  getAllProducts
} = require("../controllers/catalogProductController");

/* part catalog products */
/* get all data catalog products */
router.get("/", getAllCatalogProducts);

/* get single catalog product */
router.get("/:id", getSingleCatalogProduct);
/* post add catalog product */
router.post("/", createCatalogProducts);
/* put update catalog product */
router.put("/:id", updateCatalogProduct);
/* delete catalog product */
router.delete("/:id", deleteCatalogProduct);

/* part supplier */
router.get("/suppliers", getAllSupplier);

/* get all data products */
router.get("/products", getAllProducts);

module.exports = router;
