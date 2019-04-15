"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateOfTransaction: {
        type: Sequelize.DATE
      },
      dropShipName: {
        type: Sequelize.STRING
      },
      statusTransaction: {
        type: Sequelize.STRING
      },
      totalPriceTransaction: {
        type: Sequelize.BIGINT
      },
      customerId: {
        type: Sequelize.INTEGER
      },
      shippingAddressId: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable("Transactions");
  }
};
