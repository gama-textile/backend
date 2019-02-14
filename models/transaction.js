"use strict";
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      costomerId: DataTypes.INTEGER,
      transactionDate: DataTypes.DATE
    },
    {}
  );
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};
