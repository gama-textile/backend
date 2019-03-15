"use strict";
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    "City",
    {
      provinceId: DataTypes.INTEGER,
      name: DataTypes.STRING
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
