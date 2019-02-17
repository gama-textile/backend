"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      capital: DataTypes.INTEGER, //modal
      price: DataTypes.INTEGER,
      meter: DataTypes.INTEGER,
      transactiondetailsId: DataTypes.INTEGER
    },
    {}
  );
  Product.associate = function(models) {
    Product.hasMany(sequelize.models.TransactionDetail);
  };
  return Product;
};
