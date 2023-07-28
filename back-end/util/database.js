const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '25031998', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;

