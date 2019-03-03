const { ProductInbound, Supplier, Product } = require("../models");
const Op = require("sequelize").Op;

exports.viewProductInbound = (req, res) => {
  /*
   *GET /api/productinbounds
   *GET all view productinbound
   */

  ProductInbound.findAll({
    include: [{ model: Product }, { model: Supplier }]
  })
    .then((productinbounds) => {
      Product.findAll().then((products) => {
        Supplier.findAll().then((suppliers) => {
          res.status(200).json({
            productinbound: productinbounds,
            // product: products,
            // supplier: suppliers,
            message: "Success"
          });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("konstituen/index");
    });
};
