'use strict';
module.exports = (sequelize, DataTypes) => {
  const Authentication = sequelize.define('Authentication', {
    customerId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {});
  Authentication.associate = function(models) {
    // associations can be defined here
  };
  return Authentication;
};