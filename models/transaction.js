"use strict";
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      dateOfTransaction: DataTypes.DATE,
      dropShipName: DataTypes.STRING,
      customerId: DataTypes.INTEGER,
      shippingAddressId: DataTypes.INTEGER,
      transactionDetailId: DataTypes.INTEGER
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
  };
  return Transaction;
};
