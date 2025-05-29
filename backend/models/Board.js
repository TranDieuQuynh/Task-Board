const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Board = sequelize.define('Board', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Tự động tạo UUID
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'My Task Board',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Board.belongsTo(User);
User.hasMany(Board);

module.exports = Board;