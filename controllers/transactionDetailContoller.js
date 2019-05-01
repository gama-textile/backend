const {
  TransactionDetails,
  ProductInbound,
  Transaction
} = require("../models");
const Op = require("sequelize").Op;

exports.getAlltransactionDetails = (req, res) => {
  /*
   *GET /api/transaction-detail
   *GET all transaction details
   */
  TransactionDetails.findAll({
    include: [
      {
        association: TransactionDetails.ProductInbound,
        include: [
          { association: ProductInbound.Product },
          { association: ProductInbound.Supplier }
        ]
      },
      { model: Transaction }
    ]
  })
    .then((transactionDetails) => {
      res.status(200).json({ data: transactionDetails, message: "Success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.getAllTransactionSingleTransaction = (req, res) => {
  /*
   * params : transactionId
   * Get /api/transaction-detail/1/transaction
   * get all transaction detail single transction
   */

  const { transactionId } = req.params;

  TransactionDetails.findAll({
    include: [
      {
        association: TransactionDetails.ProductInbound,
        include: [
          { association: ProductInbound.Product },
          { association: ProductInbound.Supplier }
        ]
      },
      { model: Transaction }
    ],
    where: { transactionId: { [Op.eq]: transactionId } }
  })
    .then((transactionDetails) => {
      res.status(200).json({ data: transactionDetails, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: " Internal server error" });
    });
};

exports.createTransactionDetail = (req, res) => {
  /*
   * Post /api/transaction-detail
   * Insert transaction detail
   */

  const newTransactionDetail = ({
    length,
    transactionId,
    productInboundId
  } = req.body);

  TransactionDetails.create(newTransactionDetail)
    .then((transactionDetails) => {
      res.status(201).json({ data: transactionDetails, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};
