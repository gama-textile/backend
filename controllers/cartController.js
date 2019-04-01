const Op = require("sequelize").Op;
const { Cart, ProductInbound, Customer } = require("../models");

exports.getAllCart = (req, res) => {
  /*
   * Get /api/carts
   * Get all carts
   */

  Cart.findAll({
    include: [
      {
        association: Cart.ProductInbound,
        include: [{ association: ProductInbound.Product }]
      },
      { model: Customer }
    ]
  })
    .then((carts) => {
      res.status(200).json({ data: carts, message: "Success read all carts" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: " Internal server error" });
    });
};

exports.getSingleCart = (req, res) => {
  /*
   * params : id
   * Get /api/carts/id
   * Get cart single cart
   */
  const { id } = req.params;
  Cart.findOne({ where: { id: { [Op.eq]: id } } })
    .then((cart) => {
      res.status(200).json({ data: cart, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: " Internal server error" });
    });
};

exports.getAllCartSingleCustomer = (req, res) => {
  /*
   * params : customerId
   * Get /api/carts/1/customer
   * get all cart single customer
   */

  const { customerId } = req.params;

  Cart.findAll({
    include: [
      {
        association: Cart.ProductInbound,
        include: [{ association: ProductInbound.Product }]
      },
      { model: Customer }
    ],
    where: { customerId: { [Op.eq]: customerId } }
  })
    .then((cart) => {
      res.status(200).json({ data: cart, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: " Internal server error" });
    });
};

exports.createCart = (req, res) => {
  /*
   * Post /api/carts
   * Insert cart
   */

  const newCart = ({
    productInboundId,
    customerId,
    note,
    length_per_meter
  } = req.body);

  Cart.create(newCart)
    .then((cart) => {
      res.status(201).json({ data: cart, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.updateCart = (req, res) => {
  const { customerId } = req.params;
  const newCart = ({
    productInboundId,
    customerId,
    note,
    length_per_meter
  } = req.body);

  Cart.findOne({ where: { customerId: { [Op.eq]: customerId } } })
    .then((cart) => {
      if (cart) {
        return cart.update(newCart).then((updatedCart) => {
          res.status(200).json({ data: updatedCart, message: "Sucess" });
        });
      } else {
        res.status(400).json({ message: "District not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.deleteCart = (req, res) => {
  const { id } = req.params;
  Cart.findOne({ where: { id: { [Op.eq]: id } } })
    .then((cart) => {
      return cart.destroy();
    })
    .then((cart) => {
      res.status(200).json({ data: cart, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};
