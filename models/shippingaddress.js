'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShippingAddress = sequelize.define('ShippingAddress', {
    cityId: DataTypes.INTEGER,
    provinceId: DataTypes.INTEGER,
    districtId: DataTypes.INTEGER,
    provinceId: DataTypes.INTEGER
  }, {});
  ShippingAddress.associate = function(models) {
    // associations can be defined here
  };
  return ShippingAddress;
};