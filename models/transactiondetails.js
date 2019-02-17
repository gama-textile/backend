"use strict";
module.exports = (sequelize, DataTypes) => {
  const transactionDetails = sequelize.define(
    "transactionDetails",
    {
      transactionId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER
    },
    {}
  );
  transactionDetails.associate = function(models) {
    transactionDetails.belongsTo(sequelize.models.Transaction);
    transactionDetails.belongsTo(sequelize.models.Product);
  };
  return transactionDetails;
};
