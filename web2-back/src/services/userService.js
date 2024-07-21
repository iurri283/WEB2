const { response } = require("express");
const {
  getUserByCPF,
  getUserByEmail,
  insertUser,
  getUserIdByCPF,
  insertAccount,
} = require("../models/userModel");

const { encryptPassword, comparePassword } = require("../utils/encrypt");

const registerUser = async (nome, cpf, email, senha) => {
  const existingCPF = await getUserByCPF(cpf);
  if (existingCPF.length > 0)
    throw { status: 400, message: "CPF já cadastrado!" };

  const existingEmail = await getUserByEmail(email);
  if (existingEmail.length > 0)
    throw { status: 400, message: "Email já cadastrado!" };

  const senhaEncriptada = await encryptPassword(senha);
  await insertUser(nome, cpf, email, senhaEncriptada);

  const idUsuario = await getUserIdByCPF(cpf);
  const agConta = "0407";
  const saldoConta = 0.0;

  let numeroExistente = true;
  let numeroConta = "";

  while (numeroExistente) {
    const n1 = Math.floor(Math.random() * 99999999) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    numeroConta = `${n1}-${n2}`;

    const sqlVerificarConta = await executeQuery(
      "SELECT COUNT(*) as count FROM conta WHERE numeroConta = ?",
      [numeroConta]
    );

    if (sqlVerificarConta[0].count == 0) {
      numeroExistente = false;
    }
  }

  await insertAccount(agConta, numeroConta, saldoConta, idUsuario[0].idUsuario);

  return { message: "Usuário e Conta cadastrados com sucesso!" };
};

const loginUser = async (cpf, senha) => {
  const user = await getUserByCPF(cpf);
  if (user.length === 0) return null;
  return { user: user[0] };
};

module.exports = { registerUser, loginUser };
