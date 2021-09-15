require('dotenv').config();
const { Sequelize } = require('sequelize');

const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
});

module.exports = sequelize;
