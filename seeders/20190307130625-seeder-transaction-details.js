"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "transactionDetails",
      [
        {
          length: 1,
          transactionId: 1,
          productInboundId: 1
        },
        {
          length: 2,
          transactionId: 1,
          productInboundId: 2
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("transactionDetails", null, {});
  }
};
