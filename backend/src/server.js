import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import PublicRoutes from "./routes/public_routes.js";
import initialize from "./config/syncforce.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
