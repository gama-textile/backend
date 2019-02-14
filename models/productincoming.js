'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductIncoming = sequelize.define('ProductIncoming', {
    supplierId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    dateOfPurchase: DataTypes.DATE,
    dateOfReceipt: DataTypes.DATE,
    meter: DataTypes.FLOAT,
    price: DataTypes.INTEGER
  }, {});
  ProductIncoming.associate = function(models) {
    // associations can be defined here
  };
  return ProductIncoming;
};