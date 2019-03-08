const {
  Transaction,
  TransactionDetails,
  ProductInbound
} = require("../models");
const { Op } = require("sequelize").Op;

exports.getAlltransaction = (req, res) => {
  /*
   *GET /api/transactions
   *GET all transactions
   */
  Transaction.findAll({      
      include: [{
        association: Transaction.TransactionDetails,
        include: [{
            association: TransactionDetails.ProductInbound,
            include: [{
              association: ProductInbound.Product,
            },
            {
              association: ProductInbound.Supplier
            }]
        }]
      }]
    })
    .then((transactions) => {
      res.status(200).json({ data: transactions, message: "Success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

// include: [{ 
//           association : TransactionDetails.ProductInbound,
          // include: [{
          //   association: ProductInbound.Product
          // }]
//         }]