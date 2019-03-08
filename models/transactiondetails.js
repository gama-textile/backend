"use strict";
module.exports = (sequelize, DataTypes) => {
  const TransactionDetails = sequelize.define(
    "TransactionDetails",
    {
      length: DataTypes.INTEGER,
      transactionId: DataTypes.INTEGER,
      productInboundId: DataTypes.INTEGER
    },
    {}
  );
  TransactionDetails.associate = function(models) {

    TransactionDetails.belongsTo(sequelize.models.Transaction, {
      foreignKey: "transactionId",
    });

    TransactionDetails.ProductInbound = TransactionDetails.belongsTo(sequelize.models.ProductInbound,
    {
      foreignKey: "productInboundId"
    });
  };
  return TransactionDetails;
};
