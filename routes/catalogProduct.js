const express = require("express");
const router = express.Router();
const {
  getAllCatalogProducts,
  getSingleCatalogProduct,
  createCatalogProducts,
  updateCatalogProduct,
  deleteCatalogProduct,
  getAllSupplier,
  createSupplier,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/catalogProductController");

/* part catalog products */
/* get all data catalog products */
router.get("/", getAllCatalogProducts);
/* get single catalog product */
router.get("/:id/find", getSingleCatalogProduct);
/* post add catalog product */
router.post("/", createCatalogProducts);
/* put update catalog product */
router.put("/:id/edit", updateCatalogProduct);
/* delete catalog product */
router.delete("/:id/delete", deleteCatalogProduct);

/* part supplier */
/* get all data supplier */
router.get("/suppliers", getAllSupplier);
/* get single supplier */
router.get("/suppliers/:id/find", getSingleSupplier);
/* post add supplier */
router.post("/suppliers", createSupplier);
/* put update supplier */
router.put("/suppliers/:id/edit", updateSupplier);
/* delete catalog product */
router.delete("/suppliers/:id/delete", deleteSupplier);

/* part product */
/* get all data products */
router.get("/products", getAllProducts);
/* get single product */
router.get("/products/:id/find", getSingleProduct);
/* post add product */
router.post("/products", createProduct);
/* put update product */
router.put("/products/:id/edit", updateProduct);
/* delete catalog product */
router.delete("/products/:id/delete", deleteProduct);

module.exports = router;
