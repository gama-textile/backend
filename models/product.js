"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: DataTypes.STRING,
      width: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING
    },
    {}
  );
  Product.associate = function(models) {
    /*
     *  relasi error saat di run
     *  Product.hasMany(sequelize.models.TransactionDetail);
     */
  };
  return Product;
};
