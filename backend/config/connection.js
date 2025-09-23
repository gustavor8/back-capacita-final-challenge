const { Sequelize } = require("sequelize");
require("dotenv").config();

const connection = new Sequelize('postgresql://neondb_owner:npg_5dK4sovaQtNl@ep-late-queen-aemm2djx-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require', {
  dialect: "postgres",
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }, // obrigatório no Vercel/Neon
  },
  logging: false,
});

module.exports = connection;
