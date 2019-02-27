const express = require("express");
const { Product } = require("../models");
const Op = require("sequelize").Op;

exports.index = (req, res) => {
  /*
   * GET api/products
   * this function display all banks
   */
  Product.findAll()
    .then((products) => {
      res
        .status(200)
        .json({ data: products, message: "Success read all products" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.create = (req, res) => {
  /*
   * POST api/products
   * this function add products
   */
  const { name, width } = req.body;
  Product.create({ name, width })
    .then((products) => {
      res
        .status(201)
        .json({ data: products, message: "Success create data product" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.find = (req, res) => {
  /*
   * GET api/products/1
   * this function get a single product
   */
  const productId = req.params.id;

  Product.findOne({ where: { id: { [Op.eq]: productId } } })
    .then((product) => {
      res
        .status(200)
        .json({ data: product, message: "Success getting product" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.update = (req, res) => {
  /*
   * PUT api/products/2
   * Update single product
   */
  const productId = req.params.id;
  const { name, width } = req.body;

  Product.findOne({ where: { id: { [Op.eq]: productId } } })
    .then((product) => {
      if (product) {
        return product.update({ name, width }).then((product) => {
          res
            .status(201)
            .json({ data: product, message: "Success update product" });
        });
      } else {
        res.status(400).json({ message: "Product not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.destroy = (req, res) => {
  /*
   * DELETE api/banks/2
   * Delete a bank with the given id
   */

  const productId = req.params.id;

  Product.findOne({ where: { id: { [Op.eq]: productId } } })
    .then((product) => {
      return product.destroy();
    })
    .then((product) => {
      res
        .status(200)
        .json({ data: product, message: "Success delete product" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};
