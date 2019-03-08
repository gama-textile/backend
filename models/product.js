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
    
     Product.hasMany(sequelize.models.ProductInbound);
  };
  return Product;
};
