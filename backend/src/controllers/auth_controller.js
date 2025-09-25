import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user_model.js";

export default class AuthController {
  async login(req, res) {
    try {
      const { login, password } = req.body;
      if (!login || !password) {
        return res
          .status(400)
          .json({ message: "Login e senha são obrigatórios" });
      }

      const user = await this.#validateUser(login, password);
      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      if (!process.env.APP_KEY_TOKEN) {
        console.error("APP_KEY_TOKEN não definido!");
        return res
          .status(500)
          .json({ message: "Erro interno: chave JWT não definida" });
      }

      const token = jwt.sign(user, process.env.APP_KEY_TOKEN, {
        expiresIn: "1h",
      });

      return res.json({ token, user });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async register(req, res) {
    try {
      const { login, password } = req.body;
      if (!login || !password) {
        return res
          .status(400)
          .json({ message: "Login e senha são obrigatórios" });
      }

      const userData = await this.#createUser(login, password);

      return res.status(201).json({
        message: "Usuário registrado com sucesso",
        user: userData,
      });
    } catch (error) {
      console.error("Erro no registro:", error);

      if (error.message === "USER_ALREADY_EXISTS") {
        return res.status(409).json({ message: "Usuário já existe" });
      }
      if (error.name === "SequelizeValidationError") {
        if (error.errors.some((e) => e.validatorKey === "isEmail")) {
          return res
            .status(400)
            .json({ message: "O login precisa ser um e-mail válido" });
        }
        return res.status(400).json({
          message: "Dados inválidos",
          errors: error.errors.map((e) => e.message),
        });
      }
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }



  async #validateUser(login, password) {
    const user = await User.findOne({ where: { login } });
    if (!user) return null;

    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) return null;

    return { userId: user.id, login: user.login };
  }

  async #createUser(login, password) {
    const userExists = await User.findOne({ where: { login } });
    if (userExists) {
      throw new Error("USER_ALREADY_EXISTS");
    }
    const user = await User.create({ login, password });
    return { userId: user.id, login: user.login };
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
        console.log("Usuário admin criado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar usuário admin:", error);
    }
  }
}
