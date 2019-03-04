"use strict";
module.exports = (sequelize, DataTypes) => {
  const District = sequelize.define(
    "District",
    {
      citiesId: DataTypes.INTEGER,
      name: DataTypes.STRING
    },
    {}
  );
  District.associate = function(models) {
    // associations can be defined here
    District.belongsTo(sequelize.models.City, {
      foreignKey: "citiesId"
    });
  };
  return District;
};
