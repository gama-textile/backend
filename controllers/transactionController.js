const {
  Transaction,
  TransactionDetails,
  ProductInbound,
  Address
} = require("../models");
const Op = require("sequelize").Op;
const schedule = require('node-schedule');

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
    idPesanan,
    dateOfTransaction,
    dropShipName,
    statusTransaction,
    totalPriceTransaction,
    typeOfOngkir,
    shippingCosts,
    shippingPieces,
    note,
    noResi,
    proofOfPayment,
    customerId,
    shippingAddressId
  } = req.body;

  Transaction.findOne({ where: { idPesanan: idPesanan } }).then(
    (transactionCek) => {
      if (idPesanan === "") {
        res.status(403).json({ message: "data harus diisi" });
      } else if (transactionCek) {
        res.status(403).json({ message: "idPesanan sudah terpakai" });
      } else {
        Transaction.create({
          idPesanan,
          dateOfTransaction,
          dropShipName,
          statusTransaction,
          totalPriceTransaction,
          typeOfOngkir,
          shippingCosts,
          shippingPieces,
          note,
          noResi,
          proofOfPayment,
          customerId,
          shippingAddressId
        })
          .then((transactions) => {
            res.status(201).json({ data: transactions, message: "Success" });

            cancelOrderTimer(transactions.id);
          })
          .catch((err) => {
            console.log(err);
            console.log("err");
            res.status(500).json({ message: "Internal server error" });
          });
      }
    }
  );
};

// Fungsi untuk membatalkan order jika tidak ada bukti pembayaran yang sah
function cancelOrderTimer(transactionId) {
  // Batalkan pesanan pada tanggal
  // Tanggal sekarang ditambah 4 jam
  var date = new Date(Date.now() + 14400000); //14400000 = 4 hour || 10000 = 10 second(for testing)

  // Task ini akan saat (sekarang + 4 jam)
  var task = schedule.scheduleJob(date, function () {
    console.log(`update with id ${transactionId}`);
    Transaction.findOne({ where: { id: transactionId } }).then((transaction) => {
      if (transaction) {
        // Jika transaction.statusTransaction 'Pending' maka akan di ubah ke cancel
        if (transaction.statusTransaction == 'Pending') {

          // Cancel transaksi
          transaction.update({ statusTransaction: 'Cancel' }).then((res) => console.log(`Success`));
        }
      } else {
        // Jika transaction.statusTransaction 'Accepted' maka statusTransaction tidak akan diubah
      }
    }).catch((err) => {
      console.log(err);
    });

  });
}

exports.getAllTransactionSingleStatus = (req, res) => {
  /*
   *GET /api/transactions/1
   *GET all transactions single customer
   */

  const { statusTransaction } = req.params;

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
    where: { statusTransaction: { [Op.eq]: statusTransaction } }
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
  console.log(statusTransaction);
};
