const { DataTypes } = require("sequelize");
const connection = require("../connection");

const User = connection.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
  }
);

// Método para verificar senha (sem bcrypt)
User.prototype.checkPassword = function (password) {
  return this.password === password;
};

module.exports = User;
