"use strict";
module.exports = (sequelize, DataTypes) => {
	const transactionDetails = sequelize.define(
		"transactionDetails",
		{
			transactionId: DataTypes.INTEGER,
			productId: DataTypes.INTEGER
		},
		{}
	);
	transactionDetails.associate = function(models) {
		/*
		 * Relasi error saat di run
		 * transactionDetails.belongsTo(sequelize.models.Transaction);
		 * transactionDetails.belongsTo(sequelize.models.Product);
		 */
	};
	return transactionDetails;
};
