import AuthController from "../controllers/auth_controller.js";
import connection from "./connection.js";

async function initialize() {
  try {
    // Sincronizar modelos com o banco
    // Agora `connection` é o objeto certo e .sync() funciona diretamente
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
