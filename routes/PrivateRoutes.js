// const express = require("express");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// // Adicionando rotas privadas
// //const ProductRoutes = require("./ProductRoutes");

// const PrivateRoutes = express.Router();

// // Middleware de autenticação
// PrivateRoutes.use((request, response, next) => {
//   const token = request.headers.token;

//   if (!token) {
//     return response.status(401).json({ message: "Token não fornecido teste" });
//   }

//   try {
//     // verify token
//     const decoded = jwt.verify(token, process.env.APP_KEY_TOKEN);
//     console.log("Token válido. Dados:", decoded);
//     next();
//   } catch (error) {
//     return response.status(403).json({
//       message: "Token inválido",
//       error: error.message,
//     });
//   }
// });
// // Rotas privadas protegidas
// PrivateRoutes.use(ProductRoutes);

// module.exports = PrivateRoutes;
