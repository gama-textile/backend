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
      provinceId: DataTypes.INTEGER,
      cityId: DataTypes.INTEGER,
      districtId: DataTypes.INTEGER,
      postalCodeId: DataTypes.INTEGER
    },
    {}
  );
  Address.associate = function(models) {
    Address.Customer = Address.belongsTo(sequelize.models.Customer, {
      foreignKey: "customerId"
    });

    Address.Province = Address.belongsTo(sequelize.models.Province, {
      foreignKey: "provinceId"
    });

    Address.City = Address.belongsTo(sequelize.models.City, {
      foreignKey: "cityId"
    });

    Address.District = Address.belongsTo(sequelize.models.District, {
      foreignKey: "districtId"
    });

    Address.PostalCode = Address.belongsTo(sequelize.models.PostalCode, {
      foreignKey: "postalCodeId"
    });
  };
  return Address;
};
