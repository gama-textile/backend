const express = require("express");
const { Supplier } = require("../models");
const Op = require("sequelize").Op;

exports.index = (req, res) => {
  /*
   * GET api/suppliers
   * this function display all supplier
   */
  Supplier.findAll()
    .then((suppliers) => {
      res
        .status(200)
        .json({ data: suppliers, message: "Success read all suppliers" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.create = (req, res) => {
  /*
   * POST api/suppliers
   * this function add supplier
   */
  const { name, alamat } = req.body;
  Supplier.create({ name, alamat })
    .then((supplier) => {
      res
        .status(201)
        .json({ data: supplier, message: "Success create supplier" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.find = (req, res) => {
  /*
   * GET api/suppliers/2
   * this function get a single suppliers
   */

  const supplierId = req.params.id;

  Supplier.findOne({ where: { id: { [Op.eq]: supplierId } } })
    .then((supplier) => {
      res
        .status(200)
        .json({ data: supplier, message: "Success getting supplier" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.update = (req, res) => {
  /*
   * PUT api/suppliers/2
   * Update single supplier
   */
  const supplierId = req.params.id;
  const { name, alamat } = req.body;

  Supplier.findOne({ where: { id: { [Op.eq]: supplierId } } })
    .then((supplier) => {
      if (supplier) {
        return supplier.update({ name, alamat }).then((supplier) => {
          res
            .status(201)
            .json({ data: supplier, message: "Success update supplier" });
        });
      } else {
        res.status(400).json({ message: "supplier not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.destroy = (req, res) => {
  /*
   * DELETE api/suppliers/2
   * Delete a supplier with the given id
   */

  const supplierId = req.params.id;

  Supplier.findOne({ where: { id: { [Op.eq]: supplierId } } })
    .then((supplier) => {
      return supplier.destroy();
    })
    .then((supplier) => {
      res
        .status(200)
        .json({ data: supplier, message: "Success delete supplier" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};
