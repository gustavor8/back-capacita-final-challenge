const User = require("../models/User");

class AuthController {
  async login(login, password) {
    try {
      // Buscar usuário no banco
      const user = await User.findOne({ where: { login } });

      if (!user) {
        return null;
      }

      const isPasswordValid = user.checkPassword(password);

      if (!isPasswordValid) {
        return null;
      }

      // Retornar dados do usuário (sem a senha)
      return {
        userId: user.id,
        login: user.login,
      };
    } catch (error) {
      console.error("Erro no login:", error);
      return null;
    }
  }

  // Método para criar usuário admin inicial
  async createAdminUser() {
    try {
      const existingAdmin = await User.findOne({
        where: { login: "admin@admin.com" },
      });

      if (!existingAdmin) {
        await User.create({
          login: "admin@admin.com",
          password: "Admin", // Senha em texto puro (sem hash)
        });
      }
    } catch (error) {
      console.error("Erro ao criar usuário admin:", error);
    }
  }
}

module.exports = AuthController;
