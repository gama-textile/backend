const {
  Transaction,
  transactionDetails,
  ProductInbound
} = require("../models");
const { Op } = require("sequelize").Op;

exports.getAlltransaction = (req, res) => {
  /*
   *GET /api/transactions
   *GET all transactions
   */
  transactionDetails
    .findAll({
      include: [{ model: Transaction }, { model: ProductInbound }]
    })
    .then((transactions) => {
      res.status(200).json({ data: transactions, message: "Success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};
