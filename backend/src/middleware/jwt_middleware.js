import jwt from "jsonwebtoken";
import "dotenv/config";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se o header foi fornecido
  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  // O token vem no formato "Bearer <token>", então separamos em duas partes
  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return res.status(401).json({ message: "Erro no formato do token." });
  }

  const [scheme, token] = parts;

  // Verifica se o início do token é "Bearer"
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: "Token mal formatado." });
  }

  //Verifica a validade do token
  jwt.verify(token, process.env.APP_KEY_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido ou expirado." });
    }

    // Se o token for válido, anexa os dados do usuário na requisição (req)
    // e permite que a requisição continue para o controller
    req.user = decoded;
    return next();
  });
};

export default authMiddleware;
