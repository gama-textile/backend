"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ProductInbounds",
      [
        {
          id:1,
          color: "mereh",
          price: 1000,
          meter: 10,
          capital: 500,
          dateOfInbound: new Date(),
          productId: 1,
          supplierId: 1
        },
        {
          id:2,
          color: "biru",
          price: 2500,
          meter: 20,
          capital: 1000,
          dateOfInbound: new Date(),
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
