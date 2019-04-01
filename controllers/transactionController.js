const {
  Transaction,
  TransactionDetails,
  ProductInbound,
  Address
} = require("../models");
const Op = require("sequelize").Op;

exports.getAlltransaction = (req, res) => {
  /*
   *GET /api/transactions
   *GET all transactions
   */
  Transaction.findAll({
    include: [
      {
        association: Transaction.TransactionDetails,
        include: [
          {
            association: TransactionDetails.ProductInbound,
            include: [
              { association: ProductInbound.Product },
              { association: ProductInbound.Supplier }
            ]
          }
        ]
      },
      /*
       * Relasi Transaction -> Address
       * Relasi Address -> Customer, Address -> Province, Address -> City, Address -> District, Address -> PostalCode
       */
      {
        association: Transaction.Address,
        include: [
          { association: Address.Customer },
          { association: Address.Province },
          { association: Address.City },
          { association: Address.District },
          { association: Address.PostalCode }
        ]
      },
      /* Relasi Transaction -> Customer */
      { association: Transaction.Customer }
    ]
  })
    .then((transactions) => {
      res.status(200).json({ data: transactions, message: "Success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.getAllTransactionSingleCustomer = (req, res) => {
  /*
   *GET /api/transactions/1
   *GET all transactions single customer
   */

  const { customerId } = req.params;
  console.log(customerId);

  Transaction.findAll({
    include: [
      {
        association: Transaction.TransactionDetails,
        include: [
          {
            association: TransactionDetails.ProductInbound,
            include: [
              { association: ProductInbound.Product },
              { association: ProductInbound.Supplier }
            ]
          }
        ]
      },
      /*
       * Relasi Transaction -> Address
       * Relasi Address -> Customer, Address -> Province, Address -> City, Address -> District, Address -> PostalCode
       */
      {
        association: Transaction.Address,
        include: [
          { association: Address.Customer },
          { association: Address.Province },
          { association: Address.City },
          { association: Address.District },
          { association: Address.PostalCode }
        ]
      },
      /* Relasi Transaction -> Customer */
      { association: Transaction.Customer }
    ],
    where: { customerId: { [Op.eq]: customerId } }
  })
    .then((transactions) => {
      if (transactions) {
        res.status(200).json({ data: transactions, message: "Success" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.createTransaction = (req, res) => {
  /*
   * POST /api/transactions
   * Insert transactions
   */

  const {
    dateOfTransaction,
    dropShipName,
    customerId,
    shippingAddressId
  } = req.body;

  Transaction.create({
    dateOfTransaction,
    dropShipName,
    customerId,
    shippingAddressId
  })
    .then((transactions) => {
      res.status(201).json({ data: transactions, message: "Success" });
    })
    .catch((err) => {
      console.log(err);
      console.log("err");
      res.status(500).json({ message: "Internal server error" });
    });
};
