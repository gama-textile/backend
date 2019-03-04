"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Suppliers",
      [
        {
          name: "John Doe",
          alamat: "lampung"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Suppliers", null, {});
  }
};
