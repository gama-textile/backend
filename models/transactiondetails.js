"use strict";
module.exports = (sequelize, DataTypes) => {
  const transactionDetails = sequelize.define(
    "transactionDetails",
    {
      length: DataTypes.INTEGER,
      transactionId: DataTypes.INTEGER,
      productInboundId: DataTypes.INTEGER
    },
    {}
  );
  transactionDetails.associate = function(models) {
    /*
     * Relasi error saat di run
     * transactionDetails.belongsTo(sequelize.models.Transaction);
     * transactionDetails.belongsTo(sequelize.models.Product);
     */
    transactionDetails.belongsTo(sequelize.models.Transaction, {
      foreignKey: "transactionId"
    });

    transactionDetails.belongsTo(sequelize.models.ProductInbound, {
      foreignKey: "productInboundId"
    });
  };
  return transactionDetails;
};
