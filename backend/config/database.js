const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_board', 'postgres', '123456789', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false,
});

module.exports = sequelize;