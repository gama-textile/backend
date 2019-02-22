"use strict";
module.exports = (sequelize, DataTypes) => {
	const Transaction = sequelize.define(
		"Transaction",
		{
			costomerId: DataTypes.INTEGER,
			shippingAddressId: DataTypes.INTEGER,
			transactionDate: DataTypes.DATE
		},
		{}
	);
	Transaction.associate = function(models) {
		/*
		 * Relasi error saat di run
		 * Transaction.belongsTo(sequelize.models.Constumer);
		 */
	};
	return Transaction;
};
