const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
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
router.get("/", auth, getAllCatalogProducts);
/* get single catalog product */
router.get("/:id/find", auth, getSingleCatalogProduct);
/* post add catalog product */
router.post("/", auth, createCatalogProducts);
/* put update catalog product */
router.put("/:id/edit", auth, updateCatalogProduct);
/* delete catalog product */
router.delete("/:id/delete", auth, deleteCatalogProduct);

/* part supplier */
/* get all data supplier */
router.get("/suppliers", auth, getAllSupplier);
/* get single supplier */
router.get("/suppliers/:id/find", auth, getSingleSupplier);
/* post add supplier */
router.post("/suppliers", auth, createSupplier);
/* put update supplier */
router.put("/suppliers/:id/edit", auth, updateSupplier);
/* delete catalog product */
router.delete("/suppliers/:id/delete", auth, deleteSupplier);

/* part product */
/* get all data products */
router.get("/products", auth, getAllProducts);
/* get single product */
router.get("/products/:id/find", auth, getSingleProduct);
/* post add product */
router.post("/products", auth, createProduct);
/* put update product */
router.put("/products/:id/edit", auth, updateProduct);
/* delete catalog product */
router.delete("/products/:id/delete", auth, deleteProduct);

module.exports = router;
