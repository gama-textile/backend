"use strict";
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      dateOfTransaction: DataTypes.DATE,
      dropShipName: DataTypes.STRING,
      customerId: DataTypes.INTEGER,
      shippingAddressId: DataTypes.INTEGER
      // transactionDetailId: DataTypes.INTEGER
    },
    {}
  );
  Transaction.associate = function(models) {
    /*
     * Relasi error saat di run
     * Transaction.belongsTo(sequelize.models.Constumer);
     */
    Transaction.belongsTo(sequelize.models.Customer, {
      foreignKey: "customerId"
    });

    Transaction.belongsTo(sequelize.models.Address, {
      foreignKey: "shippingAddressId"
    });

    Transaction.hasMany(sequelize.models.transactionDetails, { as: 'detailTransactions'});

    Transaction.belongsToMany(sequelize.models.ProductInbound, {
      as: 'transaction_productInbound',
      through: sequelize.models.transactionDetails,
      foreignKey: 'productInboundId',
    })

    Transaction.belongsToMany(sequelize.models.Product, {
      as: 'transaction_product',
      through: 'ProductInbound',
      foreignKey: 'productId',
    })    
  };
  return Transaction;
};
