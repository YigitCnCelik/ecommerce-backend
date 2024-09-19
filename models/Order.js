const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Service = require('./Service');

const Order = sequelize.define('Order', {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  total_price: { type: DataTypes.FLOAT, allowNull: false }
});

Order.belongsTo(User);
Order.belongsTo(Service);

module.exports = Order;
