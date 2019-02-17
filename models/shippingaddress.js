"use strict";
module.exports = (sequelize, DataTypes) => {
  const ShippingAddress = sequelize.define(
    "ShippingAddress",
    {
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      mainAddress: DataTypes.BOOLEAN,
      storeAddress: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
      customerId: DataTypes.INTEGER,
      cityId: DataTypes.INTEGER,
      provinceId: DataTypes.INTEGER,
      districtId: DataTypes.INTEGER,
      postalCodeId: DataTypes.INTEGER
    },
    {}
  );
  ShippingAddress.associate = function(models) {};
  return ShippingAddress;
};
