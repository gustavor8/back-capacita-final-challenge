import express from "express";
import AuthController from "../controllers/auth_controller.js";

const publicRoutes = express.Router();

const authController = new AuthController();

publicRoutes.post("/login", authController.login.bind(authController));
publicRoutes.post("/register", authController.register.bind(authController));

export default publicRoutes;
