"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      nameProduct: DataTypes.STRING,
      size: DataTypes.INTEGER /* size = lebar bahan */,
      imageUrl: DataTypes.STRING
    },
    {}
  );
  Product.associate = function(models) {
    Product.hasMany(sequelize.models.ProductInbound);
  };
  return Product;
};
