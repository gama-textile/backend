"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "TransactionDetails",
      [
        {
          length: 1,
          transactionId: 1,
          productInboundId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          length: 2,
          transactionId: 1,
          productInboundId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          length: 5,
          transactionId: 1,
          productInboundId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TransactionDetails", null, {});
  }
};
