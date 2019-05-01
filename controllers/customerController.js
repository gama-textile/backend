const Op = require("sequelize").Op;
const { Authentication, Customer } = require("../models");

exports.getAllCustomer = (req, res) => {
  /*
   * GET api/customers/
   * this function return customer data
   */
  Authentication.findAll({ include: [{ model: Customer }] })
    .then((customer) => {
      res.status(200).json({ data: customer, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
      console.log(err);
    });
};

exports.getAllSingleCustomer = (req, res) => {
  /*
   * GET api/management-customers/${customerId}/customer
   * this function return customer data
   */
  const { customerId } = req.params;

  Authentication.findAll({
    include: [{ model: Customer }],
    where: { customerId: { [Op.eq]: customerId } }
  })
    .then((customer) => {
      res.status(200).json({ data: customer, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: " Internal server error" });
    });
};

exports.getSingleCustomer = (req, res) => {
  /*
   * GET api/customers/:id
   * this function return customer data
   */

  const customerId = req.params.id;

  Customer.findOne({ where: { id: { [Op.eq]: customerId } } })
    .then((customer) =>
      res.status(200).json({ data: customer, message: "Customer" })
    )
    .catch((err) => res.status(500).json({ message: "Internal server error" }));
};
