import AuthController from "../controllers/auth_controller.js";
import Favorite from "../models/favorite_model.js";
import User from "../models/user_model.js";
import connection from "./connection.js";

async function initialize() {
  try {
    // Um usuário pode ter muitos favoritos
    User.hasMany(Favorite);
    Favorite.belongsTo(User);

    await connection.sync({ force: false });

    // Criar usuário admin se não existir
    const authController = new AuthController();
    await authController.createAdminUser();

    console.log("Banco de dados inicializado com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar banco de dados:", error);
  }
}

export default initialize;
