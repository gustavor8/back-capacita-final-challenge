const { Sequelize } = require("sequelize");
require("dotenv").config();

const connection = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME || "pokemon",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Qwe12345",
  port: process.env.DB_PORT || 5432,
  logging: false,
});

module.exports = connection;
