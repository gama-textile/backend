"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ProductInbounds",
      [
        {
          color: "mereh",
          price: 1000,
          meter: 10,
          capital: 500,
          dateOfInbound: Date(),
          productId: 1,
          supplierId: 1
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ProductInbounds", null, {});
  }
};
