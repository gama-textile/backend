"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Addresses",
      [
        {
          name: "Jln. Abdul Kadir Gg. pipit",
          phoneNumber: "089898989",
          mainAddress: true,
          storeAddress: true,
          description: "Gedung A",
          latitude: "9090909",
          longitude: "9099090",
          customerId: 1,
          cityId: 1101,
          provinceId: 11,
          districtId: 1101010,
          postalCodeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Jln. Abdul Kadir Gg. pipit",
          phoneNumber: "089898989",
          mainAddress: true,
          storeAddress: true,
          description: "Gedung A",
          latitude: "9090909",
          longitude: "9099090",
          customerId: 1,
          cityId: 1101,
          provinceId: 11,
          districtId: 1101010,
          postalCodeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Addresses", null, {});
  }
};
