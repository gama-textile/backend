"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const password = bcrypt.hashSync("rahasia", 10);
    return queryInterface.bulkInsert(
      "Authentications",
      [
        {
          customerId: 1,
          email: "elfinsanjaya12@gmail.com",
          password: password,
          facebook: "",
          phoneNumber: "08154023099",
          salt: "",
          lastLogin: "",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          customerId: 2,
          email: "karya.tiosaputra@gmail.com",
          password: password,
          facebook: "",
          phoneNumber: "0895396914045",
          salt: "",
          lastLogin: "",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Authentications", null, {});
  }
};
