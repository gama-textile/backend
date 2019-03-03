"use strict";
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    "City",
    {
      name: DataTypes.STRING,
      provinceId: DataTypes.INTEGER
    },
    {}
  );
  City.associate = function(models) {
    // associations can be defined here
    City.belongsTo(sequelize.models.Province, {
      foreignKey: "provinceId"
    });
  };
  return City;
};
