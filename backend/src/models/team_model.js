import { DataTypes } from "sequelize";
import connection from "../config/connection.js";

const Team = connection.define(
  "Team",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    pokemonIds: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "teams",
    timestamps: true,
  }
);

export default Team;
