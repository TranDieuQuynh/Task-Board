const { Sequelize } = require('sequelize');

module.exports = new Sequelize('task_board', 'postgres', '123456789', {
  host: 'db',
  dialect: 'postgres',
  port: 5432,
});
