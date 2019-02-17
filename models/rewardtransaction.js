"use strict";
module.exports = (sequelize, DataTypes) => {
  const RewardTransaction = sequelize.define(
    "RewardTransaction",
    {
      dateOfRedeem: DataTypes.DATE,
      rewardId: DataTypes.INTEGER,
      CustomerId: DataTypes.INTEGER
    },
    {}
  );
  RewardTransaction.associate = function(models) {
    RewardTransaction.belongsTo(sequelize.models.Reward);
    RewardTransaction.belongsTo(sequelize.models.Customer);
  };
  return RewardTransaction;
};
