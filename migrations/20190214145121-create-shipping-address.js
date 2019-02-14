"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ShippingAddresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      provinceId: {
        type: Sequelize.INTEGER
      },
      cityId: {
        type: Sequelize.INTEGER
      },
      postalCodeId: {
        type: Sequelize.INTEGER
      },
      mainAddress: {
        type: Sequelize.BOOLEAN
      },
      storeAddress: {
        type: Sequelize.BOOLEAN
      },
      Description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("ShippingAddresses");
  }
};
