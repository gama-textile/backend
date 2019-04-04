const Op = require("sequelize").Op;
const { Customer } = require("../models");

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
