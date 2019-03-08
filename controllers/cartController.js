const { District, PostalCode } = require("../models");
const Op = require("sequelize").Op;
const { Cart } = require('../models');

exports.index = (req, res) => {
	Cart.findAll()
    .then((carts) => {
      res.status(200).json({ data: carts, message: "Success read all carts" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: " Internal server error" });
    });
}

exports.show = (req, res) => {
	const { id } = req.params;

	Cart.findOne({ where : { id: { [Op.eq]: id }  }})
	.then((cart) => {
		res.status(200).json({ data: cart, message: "Success" });	
	})
	.catch((err) => {
		res.status(500).json({ message: " Internal server error" });
	})
}

exports.create = (req, res) => {
	const cart = ({ productInboundId, customerId, note, length_per_meter } = req.body);

	Cart.create(cart)
    .then((cart) => {
      res.status(201).json({ data: cart, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
}

exports.update = (req, res) => {

	const { id } = req.params;
	const newCart = ({ productInboundId, customerId, note, length_per_meter } = req.body);

	Cart.findOne({ where: { id: { [Op.eq]: id } } })
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
}

exports.destroy = (req, res) => {

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
}