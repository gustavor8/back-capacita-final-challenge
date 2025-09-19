const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const AuthController = require("../controllers/AuthController");

const PublicRoutes = express.Router();

PublicRoutes.post("/login", async (request, response) => {
  try {
    const { login, password } = request.body;

    if (!login || !password) {
      return response.status(400).json({
        message: "Login e senha são obrigatórios",
      });
    }

    const auth = new AuthController();
    const userData = await auth.login(login, password);

    if (userData) {
      const token = jwt.sign(userData, process.env.APP_KEY_TOKEN, {
        expiresIn: "1h",
      });

      return response.json({
        token,
        user: userData,
      });
    }

    return response.status(401).json({
      message: "Credenciais inválidas",
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return response.status(500).json({
      message: "Erro interno do servidor",
    });
  }
});

module.exports = PublicRoutes;
