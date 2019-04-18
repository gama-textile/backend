"use strict";
module.exports = (sequelize, DataTypes) => {
  const Authentication = sequelize.define(
    "Authentication",
    {
      customerId: DataTypes.INTEGER,
      username: DataTypes.STRING,
      domisili: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      facebook: DataTypes.STRING,
      salt: DataTypes.STRING
    },
    {}
  );
  Authentication.associate = function(models) {
    // associations can be defined here
    Authentication.belongsTo(sequelize.models.Customer, {
      foreignKey: "customerId"
    });
  };
  return Authentication;
};
