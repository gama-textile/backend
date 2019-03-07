const { ProductInbound, Supplier, Product } = require("../models");
const Op = require("sequelize").Op;

exports.viewProductInbound = (req, res) => {
  /*
   *GET /api/productinbounds
   *GET all view productinbounds
   */

  ProductInbound.findAll({
    include: [{ model: Product }, { model: Supplier }]
  })
    .then((productinbounds) => {
      Product.findAll().then((products) => {
        Supplier.findAll().then((suppliers) => {
          res.status(200).json({
            data: productinbounds,
            // product: products,
            // supplier: suppliers,
            message: "Success"
          });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.createProductInbound = (req, res) => {
  /*
   * POST /api/productinbounds
   * Insert productinbounds
   */
  const productinbound = ({
    color,
    price,
    meter,
    capital,
    dateOfInbound,
    productId,
    supplierId
  } = req.body);

  ProductInbound.create(productinbound)
    .then((productinbound) => {
      res.status(201).json({ data: productinbound, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.getSingleProductInbound = (req, res) => {
  /*
   * params : id
   * GET /api/productinbounds/1
   * Get single productinbounds by the gived id
   */

  const { id } = req.params;

  ProductInbound.findOne({
    include: [{ model: Supplier }, { model: Product }],
    where: { id: { [Op.eq]: id } }
  })
    .then((productinbound) => {
      res.status(200).json({ data: productinbound, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.updateProductInbound = (req, res) => {
  /*
   * params : id
   * PUT /api/productinbound/1
   * Update productinbound with the given id
   */

  const { id } = req.params;
  const newProductInbound = ({
    color,
    price,
    meter,
    capital,
    dateOfInbound,
    productId,
    supplierId
  } = req.body);

  ProductInbound.findOne({ where: { id: { [Op.eq]: id } } })
    .then((productinbound) => {
      if (productinbound) {
        return productinbound
          .update(newProductInbound)
          .then((updatedProductInbound) => {
            res
              .status(200)
              .json({ data: updatedProductInbound, message: "Sucess" });
          });
      } else {
        res.status(400).json({ message: "ProductInbound not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.deleteProductInbound = (req, res) => {
  /*
   * params : id
   * DELETE /api/productinbounds
   * Delete producinbound with the gived id
   */
  const { id } = req.params;

  ProductInbound.findOne({ where: { id: { [Op.eq]: id } } })
    .then((productinbound) => {
      return productinbound.destroy();
    })
    .then((productinbound) => {
      res.status(200).json({ data: productinbound, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};
