"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Banks",
      [
        {
          name: "Mandiri",
          nomorRekening: "192-001-001"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Banks", null, {});
  }
};
