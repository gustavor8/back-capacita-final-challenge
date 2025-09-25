import { DataTypes } from "sequelize";
import connection from "../config/connection.js";

const Favorite = connection.define(
  "Favorite",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    pokemonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  },
  {
    tableName: "favorites",
    timestamps: true, 
    
    indexes: [
      {
        unique: true,
        fields: ["UserId", "pokemonId"],
      },
    ],
  }
);

export default Favorite;