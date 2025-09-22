const express = require("express");
require("dotenv").config();
const PublicRoutes = require("./routes/PublicRoutes");
const initialize = require("./config/syncforce");

const app = express();

// Middlewares
app.use(express.json());

// Rotas
app.use("/api", PublicRoutes);

// Inicializar banco e depois iniciar servidor
initialize().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
  });
});
