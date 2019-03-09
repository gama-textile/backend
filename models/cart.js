'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    productInboundId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    note: DataTypes.STRING,
    length_per_meter: DataTypes.INTEGER
  }, {});
  Cart.associate = function(models) {
    Cart.ProductInbound = Cart.belongsTo(sequelize.models.ProductInbound, { foreignKey: 'productInboundId'});
    
    Cart.belongsTo(sequelize.models.Customer, { foreignKey: 'customerId'})
  };
  return Cart;
};