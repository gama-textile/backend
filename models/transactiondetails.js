'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactionDetails = sequelize.define('transactionDetails', {
    transaksiId: DataTypes.INTEGER,
    harga: DataTypes.INTEGER,
    persen: DataTypes.INTEGER
  }, {});
  transactionDetails.associate = function(models) {
    // associations can be defined here
  };
  return transactionDetails;
};