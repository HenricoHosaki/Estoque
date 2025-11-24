const jwt = require('jsonwebtoken'); // estava errado, era ('jsonwebtoken') sem require
const user = require('../service/user'); // ou o caminho correto do seu model/service
const secretKey = process.env.JWT_SECRET; // Certifique-se de que a variável de ambiente está definida

function authMiddleware(role) {
  return async (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token, role);

    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }

    // Remove o prefixo "Bearer " se existir
    const tokenValue = token.startsWith("Bearer ") ? token.slice(7) : token;

    jwt.verify(tokenValue, secretKey, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "Invalid Token" });
      }

      // Exemplo de verificação no banco (ajuste conforme seu código real)
      const verify = await user.verify(decoded.id, decoded.role);
      if (!verify) {
        return res.status(401).json({ message: "User not verified" });
      }

      // Corrigido o includes (era include)
      if (role && !role.includes(decoded.role)) {
        return res.status(403).json({ message: "Permission denied" });
      }

      req.session = decoded;
      next();
    });
  };
}

module.exports = authMiddleware;