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
      idPesanan: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
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
      typeOfOngkir: {
        type: Sequelize.STRING
      },
      shippingCosts: {
        type: Sequelize.INTEGER
      },

      shippingPieces: {
        type: Sequelize.INTEGER
      },
      note: {
        type: Sequelize.STRING
      },
      noResi: {
        type: Sequelize.STRING
      },
      proofOfPayment: {
        type: Sequelize.TEXT
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
