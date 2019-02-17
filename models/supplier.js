"use strict";
module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define(
    "Supplier",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Supplier.associate = function(models) {
    // associations can be defined here
  };
  return Supplier;
};
