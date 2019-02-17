"use strict";
module.exports = (sequelize, DataTypes) => {
  const Reward = sequelize.define(
    "Reward",
    {
      name: DataTypes.STRING,
      costPoint: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      stock: DataTypes.INTEGER
    },
    {}
  );
  Reward.associate = function(models) {
    Reward.hasMany(sequelize.models.RewardTransaction);
  };
  return Reward;
};
