const jwt = require("jsonwebtoken");
const privateKey = "20232024"; // Certifique-se de que a chave privada é a mesma usada para assinar o token

const middlewareValidarJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extraia o token do header

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
    req.userInfo = userInfo; // Armazene as informações do usuário decodificadas na requisição
    next();
  });
};

module.exports = middlewareValidarJWT;
