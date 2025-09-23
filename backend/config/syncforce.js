const AuthController = require("../controllers/AuthController");
const connection = require("./connection");

async function initialize() {
  try {
    // Sincronizar modelos com o banco
    await connection.sync({ force: false });

    // Criar usuário admin se não existir
    const authController = new AuthController();
    await authController.createAdminUser();

    console.log("Banco de dados inicializado com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar banco de dados:", error);
  }
}

module.exports = initialize;
