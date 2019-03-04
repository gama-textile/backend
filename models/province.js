"use strict";
module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define(
    "Province",
    {
      name: DataTypes.STRING,
      districtId: DataTypes.INTEGER
    },
    {}
  );
  Province.associate = function(models) {
    // associations can be defined here
    Province.belongsTo(sequelize.models.District, {
      foreignKey: "districtId"
    });
  };
  return Province;
};
