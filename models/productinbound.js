"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductInbound = sequelize.define(
    "ProductInbound",
    {
      color: DataTypes.STRING,
      price: DataTypes.INTEGER,
      meter: DataTypes.INTEGER,
      capital: DataTypes.INTEGER,
      dateOfInbound: DataTypes.DATE,
      productId: DataTypes.INTEGER,
      supplierId: DataTypes.INTEGER
    },
    {}
  );
  ProductInbound.associate = function(models) {
    // associations can be defined here
    ProductInbound.belongsTo(sequelize.models.Product, {
      as: '',
      foreignKey: "productId"
    });

    ProductInbound.belongsTo(sequelize.models.Supplier, {
      foreignKey: "supplierId"
    });

    ProductInbound.hasMany(sequelize.models.transactionDetails, { as: 'ProductDetail'})

    ProductInbound.belongsToMany(sequelize.models.Transaction, { 
      as: 'product_inbound', through: sequelize.models.transactionDetails, 
      foreignKey: 'transactionId' 
    })
  };
  return ProductInbound;
};
