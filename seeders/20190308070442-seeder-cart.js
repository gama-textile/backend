'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Carts', [
        {
          id: 1,
          productInboundId : 1,
          customerId : 2,
          note : "Yang bagus ya kakak",
          length_per_meter : 12,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          productInboundId : 2,
          customerId : 2,
          note : "Yang bagus ya kakak",
          length_per_meter : 12,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Carts', null, {});
  }
};
