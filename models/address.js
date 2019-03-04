"use strict";
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      // Attributes
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      mainAddress: DataTypes.BOOLEAN,
      storeAddress: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,

      // Foreign Key
      customerId: DataTypes.INTEGER,
      cityId: DataTypes.INTEGER,
      provinceId: DataTypes.INTEGER,
      districtId: DataTypes.INTEGER,
      postalCodeId: DataTypes.INTEGER
    },
    {}
  );
  Address.associate = function(models) {
    Address.belongsTo(sequelize.models.Customer);
  };
  return Address;
};
