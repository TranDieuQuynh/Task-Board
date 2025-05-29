const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Board = require('./Board');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'New Task',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '📋',
  },
  status: {
    type: DataTypes.ENUM('In Progress', 'Completed', "Won't do"),
    allowNull: false,
    defaultValue: 'In Progress',
  },
});

Task.belongsTo(Board);
Board.hasMany(Task);

module.exports = Task;