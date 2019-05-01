"use strict";
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      idPesanan: DataTypes.STRING,
      dateOfTransaction: DataTypes.DATE,
      dropShipName: DataTypes.STRING,
      statusTransaction: DataTypes.STRING,
      totalPriceTransaction: DataTypes.BIGINT,
      typeOfOngkir: DataTypes.STRING, // JENIS PENGIRIMAN
      shippingCosts: DataTypes.INTEGER, //BIAYA PENGIRIMAN
      shippingPieces: DataTypes.INTEGER, //potongan pengiriman
      note: DataTypes.STRING,
      noResi: DataTypes.STRING,
      proofOfPayment: DataTypes.STRING,
      customerId: DataTypes.INTEGER,
      shippingAddressId: DataTypes.INTEGER
    },
    {}
  );
  Transaction.associate = function (models) {
    Transaction.Customer = Transaction.belongsTo(sequelize.models.Customer, {
      foreignKey: "customerId"
    });

    Transaction.belongsTo(sequelize.models.Address, {
      foreignKey: "shippingAddressId"
    });

    Transaction.TransactionDetails = Transaction.hasMany(
      sequelize.models.TransactionDetails
    );

    Transaction.Address = Transaction.belongsTo(sequelize.models.Address, {
      foreignKey: "shippingAddressId"
    });

    // Transaction.belongsToMany(sequelize.models.ProductInbound, {
    //   as: 'transaction_productInbound',
    //   through: sequelize.models.transactionDetails,
    //   foreignKey: 'productInboundId',
    // });

    // Transaction.belongsToMany(sequelize.models.Product, {
    //   as: 'transaction_product',
    //   through: sequelize.models.ProductInbound,
    //   foreignKey: 'productId',
    // });
  };
  return Transaction;
};
