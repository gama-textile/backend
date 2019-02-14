'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    nama: DataTypes.STRING,
    modal: DataTypes.INTEGER,
    harga: DataTypes.INTEGER,
    stok: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};