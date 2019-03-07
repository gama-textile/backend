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
      foreignKey: "productId"
    });
    ProductInbound.belongsTo(sequelize.models.Supplier, {
      foreignKey: "supplierId"
    });
    ProductInbound.belongsTo(sequelize.models.transactionDetails);
  };
  return ProductInbound;
};
