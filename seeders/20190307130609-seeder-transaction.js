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
          shippingAddressId: 1
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Transactions", null, {});
  }
};
