"use strict";
module.exports = (sequelize, DataTypes) => {
  const PostalCode = sequelize.define(
    "PostalCode",
    {
      name: DataTypes.STRING
    },
    {}
  );
  PostalCode.associate = function(models) {
    // associations can be defined here
  };
  return PostalCode;
};
