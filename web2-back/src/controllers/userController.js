const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerUser, loginUser } = require("../services/userService");
const privateKey = "20232024";

const login = async (req, res) => {
  console.log("controller/login");
  try {
    const { cpf, senha } = req.body;
    const { user } = await loginUser(cpf, senha);

    if (!user) {
      return res.status(401).json({ mensagem: "Usuário inexistente!" });
    }

    const senhaIguais = await bcrypt.compare(senha, user.senhaUsuario);

    if (!senhaIguais) {
      return res.status(401).json({ mensagem: "Senha incorreta" });
    }

    jwt.sign({ cpf }, privateKey, (err, token) => {
      if (err) {
        return res.status(500).json({ mensagem: "Erro ao gerar o JWT" });
      } else {
        return res
          .set("x-access-token", token)
          .json({ mensagem: "Login bem-sucedido", token, user });
      }
    });
  } catch (error) {
    res.status(error.status || 500).json({ mensagem: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { nome, cpf, email, senha } = req.body;
    const response = await registerUser(nome, cpf, email, senha);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({ mensagem: error.message });
  }
};

module.exports = { login, register };
