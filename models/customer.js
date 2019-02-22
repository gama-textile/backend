"use strict";
module.exports = (sequelize, DataTypes) => {
	const Customer = sequelize.define(
		"Customer",
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			dateOfBirth: DataTypes.DATE,
			phoneNumber: DataTypes.DATE
		},
		{}
	);
	Customer.associate = function(models) {
		/*
		 * associations can be defined here
		 * Relasi error saat di run
		 * Costumer.hasManny(sequelize.models.Transaction);
		 */
	};
	return Customer;
};
