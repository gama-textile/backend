"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Transactions",
      [
        {
          dateOfTransaction: new Date(),
          dropShipName: "tio",
          customerId: 1,
          shippingAddressId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Transactions", null, {});
  }
};
