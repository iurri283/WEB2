const jwt = require("jsonwebtoken");
const privateKey = "20232024";

const middlewareValidarJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ titulo: "Erro de acesso!", mensagem: "Token não fornecido!" });
  }

  jwt.verify(token, privateKey, (err, userInfo) => {
    if (err) {
      return res
        .status(403)
        .json({ titulo: "Erro de acesso!", mensagem: "Permissão negada!" });
    }
    req.userInfo = userInfo; // Armazena as informações do usuário decodificadas na requisição
    next();
  });
};

module.exports = middlewareValidarJWT;
