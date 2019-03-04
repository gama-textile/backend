"use strict";
module.exports = (sequelize, DataTypes) => {
  const District = sequelize.define(
    "District",
    {
      name: DataTypes.STRING,
      postalCodeId: DataTypes.INTEGER
    },
    {}
  );
  District.associate = function(models) {
    // associations can be defined here
    District.belongsTo(sequelize.models.PostalCode, {
      foreignKey: "postalCodeId"
    });
  };
  return District;
};
