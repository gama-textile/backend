'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    costomerId: DataTypes.INTEGER,
    tanggal_transaksi: DataTypes.DATE
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};