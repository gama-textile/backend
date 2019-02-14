"use strict";
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      address: DataTypes.STRING,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      district: DataTypes.STRING,
      postalCode: DataTypes.INTEGER,
      phoneNumber: DataTypes.STRING
    },
    {}
  );
  Address.associate = function(models) {
    // associations can be defined here
  };
  return Address;
};
