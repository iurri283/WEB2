/**
 * Controllers servem como uma camada intermediária que lida com as requisições HTTP
 * e decide quais ações devem ser tomadas
 * Um controller extrai informações das requisições, chama métodos apropriados nos serviços
 * e em seguida envia as respostas adequadas de volta ao cliente.
 */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerUser, loginUser } = require("../services/userService");
const {
  getUserByCPF,
  getAccountByUserID,
  updateUserByID,
} = require("../models/userModel");
const privateKey = "20232024";

const login = async (req, res) => {
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

const userInfo = async (req, res) => {
  try {
    const { cpf } = req.userInfo; // Obtenha o CPF do token decodificado
    const user = await getUserByCPF(cpf);
    const account = await getAccountByUserID(user[0].idUsuario);

    if (user.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado!" });
    }

    if (account.length === 0) {
      return res.status(404).json({ mensagem: "Conta não encontrada!" });
    }

    const DATA = { user: user[0], account: account };

    res.status(200).json(DATA);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao obter informações do usuário!" });
  }
};

const changeUserInfo = async (req, res) => {
  try {
    const { cpf } = req.userInfo; // Obtenha o CPF do token decodificado
    const user = await getUserByCPF(cpf);

    if (user.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado!" });
    }

    // console.log(req.body);
    try {
      const response = await updateUserByID(user[0].idUsuario, req.body);
      if (!response.affectedRows) {
        return res
          .status(500)
          .json({ mensagem: "Erro ao atualizar o usuário." });
      }
      const userUpdated = await getUserByCPF(cpf);
      res.status(200).json({
        titulo: "Sucesso!",
        message: "Usuário atualizado com sucesso!",
        user: userUpdated,
      });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao tentar atualizar o usuário!" });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao obter informações do usuário!" });
  }
};

module.exports = { login, register, userInfo, changeUserInfo };
