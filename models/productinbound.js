"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductInbound = sequelize.define(
    "ProductInbound",
    {
      color: DataTypes.STRING,
      ingredients: DataTypes.STRING,
      description: DataTypes.STRING,
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
    ProductInbound.Product = ProductInbound.belongsTo(
      sequelize.models.Product,
      {
        foreignKey: "productId"
      }
    );

    ProductInbound.Supplier = ProductInbound.belongsTo(
      sequelize.models.Supplier,
      {
        foreignKey: "supplierId"
      }
    );

    ProductInbound.hasMany(sequelize.models.TransactionDetails);
  };
  return ProductInbound;
};
