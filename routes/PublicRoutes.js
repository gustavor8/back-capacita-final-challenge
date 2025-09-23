const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const AuthController = require("../controllers/AuthController");

const PublicRoutes = express.Router();

PublicRoutes.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) return res.status(400).json({ message: "Login e senha são obrigatórios" });

    const auth = new AuthController();
    const userData = await auth.login(login, password);

    if (!userData) {
      console.log("Login falhou para:", login);
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    if (!process.env.APP_KEY_TOKEN) {
      console.error("APP_KEY_TOKEN não definido!");
      return res.status(500).json({ message: "Erro interno: chave JWT não definida" });
    }

    const token = jwt.sign(userData, process.env.APP_KEY_TOKEN, { expiresIn: "1h" });
    return res.json({ token, user: userData });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});


PublicRoutes.post("/register", async (request, response) => {
  try {
    const { login, password } = request.body;

    if (!login || !password) {
      return response.status(400).json({
        message: "Login e senha são obrigatórios",
      });
    }

    const auth = new AuthController();
    const userData = await auth.register(login, password);

    return response.status(201).json({
      message: "Usuário registrado com sucesso",
      user: userData,
    });
  } catch (error) {
    console.error("Erro no registro:", error);

    if (error.message === "USER_ALREADY_EXISTS") {
      return response.status(409).json({
        message: "Usuário já existe",
      });
    }
    if (error.name === "SequelizeValidationError") {
      if (error.errors.some((e) => e.validatorKey === "isEmail")) {
        return response.status(400).json({
          message: "O login precisa ser um e-mail válido",
        });
      }

      return response.status(400).json({
        message: "Dados inválidos",
        errors: error.errors.map((e) => e.message),
      });
    }

    if (error.message === "SERVER_ERROR") {
      return response.status(500).json({
        message: "Erro interno do servidor",
      });
    }

    return response.status(500).json({
      message: "Erro interno do servidor: " + error,
    });
  }
});

module.exports = PublicRoutes;
