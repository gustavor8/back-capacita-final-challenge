const User = require("../models/UserModel");

class AuthController {
  async login(login, password) {
    try {
      const user = await User.findOne({ where: { login } });
      if (!user) {
        return null;
      }

      const isPasswordValid = await user.checkPassword(password);
      if (!isPasswordValid) {
        return null;
      }

      return {
        userId: user.id,
        login: user.login,
      };
    } catch (error) {
      console.error("Erro no login:", error);
      return null;
    }
  }

  async register(login, password) {
    try {
      const userExists = await User.findOne({ where: { login } });
      if (userExists) {
        throw new Error("USER_ALREADY_EXISTS");
      }

      const user = await User.create({ login, password });
      return {
        userId: user.id,
        login: user.login,
      };
    } catch (error) {
      if (error.message === "USER_ALREADY_EXISTS") {
        throw error;
      }
      if (error.name === "SequelizeValidationError") {
        throw error;
      }

      console.error("Erro ao registrar usuário:", error);
      throw new Error("SERVER_ERROR");
    }
  }

  async createAdminUser() {
    try {
      const existingAdmin = await User.findOne({
        where: { login: "admin@admin.com" },
      });

      if (!existingAdmin) {
        await User.create({
          login: "admin@admin.com",
          password: "Admin",
        });
      }
    } catch (error) {
      console.error("Erro ao criar usuário admin:", error);
    }
  }
}

module.exports = AuthController;
("");
