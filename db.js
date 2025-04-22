const { Sequelize } = require("sequelize");
const DB_NAME = "signs";
const DB_USER = "root";
const DB_PASSWORD = "Chitransh";
const DB_HOST = "localhost";
const DB_DIALECT = "mysql";
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
});
module.exports = sequelize;
