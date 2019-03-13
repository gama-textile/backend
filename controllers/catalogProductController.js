const { ProductInbound, Supplier, Product } = require("../models");
const Op = require("sequelize").Op;

/* part catalog products */
exports.getAllCatalogProducts = (req, res) => {
  /*
   * Get /api/catalog-products
   * Get all catalog products
   */

  ProductInbound.findAll({
    include: [{ model: Product }, { model: Supplier }]
  })
    .then((catalogProducts) => {
      res.status(200).json({ data: catalogProducts, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.createCatalogProducts = (req, res) => {
  /*
   * Post /api/catalog-products
   * Insert catalog products
   */

  const newCatalogProduct = ({
    color,
    material,
    description,
    price,
    mater,
    capital,
    dateOfInbound,
    productId,
    supplierId
  } = req.body);

  ProductInbound.create(newCatalogProduct)
    .then((newCatalogProduct) => {
      res.status(201).json({ data: newCatalogProduct, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.getSingleCatalogProduct = (req, res) => {
  /*
   * Get /api/catalog-products/1
   * Get a single catalog product
   */

  const catalogProductId = req.params.id;
  ProductInbound.findOne({
    where: { id: { [Op.eq]: catalogProductId } },
    include: [{ model: Product }, { model: Supplier }]
  })
    .then((catalogProduct) => {
      res.status(200).json({ data: catalogProduct, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.updateCatalogProduct = (req, res) => {
  /*
   * PUT /api/catalog-products/1
   * Update catalog product with the given id
   */

  const { id } = req.params;
  const updateCatalogProduct = ({
    color,
    material,
    description,
    price,
    mater,
    capital,
    dateOfInbound
  } = req.body);

  ProductInbound.findOne({ where: { id: { [Op.eq]: id } } })
    .then((catalogProduct) => {
      if (catalogProduct) {
        return catalogProduct
          .update(updateCatalogProduct)
          .then((updatedCatalogProduct) => {
            res
              .status(200)
              .json({ data: updatedCatalogProduct, message: "Success" });
          });
      } else {
        res.status(400).json({ message: "Catalog Product not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.deleteCatalogProduct = (req, res) => {
  /*
   * Delete /api/catalog-products/1
   * delete a catalog-products with the given id
   */

  const catalogProductId = req.params.id;

  ProductInbound.findOne({ where: { id: { [Op.eq]: catalogProductId } } })
    .then((catalogProduct) => {
      return catalogProduct.destroy();
    })
    .then((deleteCatalogProduct) => {
      res.status(200).json({ data: deleteCatalogProduct, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

/* part supplier */
exports.getAllSupplier = (req, res) => {
  /*
   * Get /api/catalog-products/suppliers
   * Get all suppliers
   */
  Supplier.findAll()
    .then((suppliers) => {
      res.status(200).json({ data: suppliers, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.createSupplier = (req, res) => {
  /*
   * Post /api/catalog-products/suppliers
   * Insert supplier
   */

  const newSupplier = ({ name, alamat } = req.body);

  Supplier.create(newSupplier)
    .then((supplier) => {
      res.status(200).json({ data: supplier, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.getSingleSupplier = (req, res) => {
  /*
   * Get /api/catalog-products/suppliers/1
   * Get single supplier with the given id
   */

  const supplierId = req.params.id;

  Supplier.findOne({ where: { id: { [Op.eq]: supplierId } } })
    .then((supplier) => {
      res.status(200).json({ data: supplier, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.updateSupplier = (req, res) => {
  /*
   * Put /api/catalog-products/suppliers/1
   * Update supplier with the given id
   */
  const supplierId = req.params.id;
  const updateSupplier = ({ name, alamat } = req.body);

  Supplier.findOne({ where: { id: { [Op.eq]: supplierId } } })
    .then((supplier) => {
      if (supplier) {
        return supplier.update(updateSupplier).then((updateSupplier) => {
          res.status(201).status({ data: updateSupplier, message: "Success" });
        });
      } else {
        res.status(404).json({ message: "Supplier not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.deleteSupplier = (req, res) => {
  /*
   * Delete /api/catalog-products/suppliers/1
   * Delete a supplier with the given id
   */

  const supplierId = req.params.id;

  Supplier.findOne({ where: { id: { [Op.eq]: supplierId } } })
    .then((supplier) => {
      return supplier.destroy();
    })
    .then((deleteSupplier) => {
      res.status(200).json({ data: deleteSupplier, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

/* part product */
exports.getAllProducts = (req, res) => {
  /*
   * Get /api/catalog-products/products
   * Get all products
   */

  Product.findAll()
    .then((products) => {
      res.status(200).json({ data: products, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.createProduct = (req, res) => {
  /*
   * Post /api/catalog-products/products
   * Insert products
   */

  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  sampleFile = req.files.imageUrl;
  uploadPath = "public/images/" + sampleFile.name;
  const { name, width } = req.body;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).json({ message: "  Internal server error" });
    }
    Product.create({ name, width, imageUrl: uploadPath })
      .then((product) => {
        res.status(200).json({ message: "Success" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  });
};

exports.getSingleProduct = (req, res) => {
  /*
   * GET /api/catalog-products/products/1
   * single products with the given id
   */
  const productId = req.params.id;

  Product.findOne({ where: { id: { [Op.eq]: productId } } })
    .then((product) => {
      res.status(200).json({ data: product, message: "Success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.updateProduct = (req, res) => {
  /*
   * PUT /api/catalog-products/products/1
   * Update single product
   */

  const productId = req.params.id;

  const { name, width, imageUrl } = req.body;

  Product.findOne({ where: { id: { [Op.eq]: productId } } })
    .then((product) => {
      if (product) {
        return product.update({ name, width, imageUrl }).then((product) => {
          res.status(201).json({ data: product, message: "Success" });
        });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.deleteProduct = (req, res) => {
  /*
   * DELETE /api/catalog-products/products/1
   * Delete a bank with the given id
   */

  const productId = req.params.id;

  Product.findOne({ where: { id: { [Op.eq]: productId } } })
    .then((product) => {
      return product.destroy();
    })
    .then((deleteProduct) => {
      res.status(200).json({ data: deleteProduct, message: "Success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};
