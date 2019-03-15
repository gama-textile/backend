"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Customers",
      [
        {
          id:1,
          firstName: "Elfin",
          lastName: "Sanjaya",
          dateOfBirth: new Date(),
          gender: "laki-laki",
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          id:2,
          firstName: "Tio",
          lastName: "Saputra",
          dateOfBirth: new Date(),
          gender: "laki-laki",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Customers", null, {});
  }
};
