/**
 * Camada responsável pela interação direta com o banco de dados
 * Representa as entidades da aplicação e é responsável pelo CRUD
 */
const createConnection = require("../config/db");

const executeQuery = async (sql, params = []) => {
  const connection = await createConnection();
  try {
    const [rows] = await connection.execute(sql, params);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};

const getUserByCPF = async (cpf) => {
  return await executeQuery("SELECT * FROM usuario WHERE cpfUsuario = ?", [
    cpf,
  ]);
};

const getUserByEmail = async (email) => {
  return await executeQuery("SELECT * FROM usuario WHERE emailUsuario = ?", [
    email,
  ]);
};

const insertUser = async (nome, cpf, email, senha) => {
  return await executeQuery(
    "INSERT INTO usuario (nomeUsuario, cpfUsuario, emailUsuario, senhaUsuario) VALUES (?,?,?,?)",
    [nome, cpf, email, senha]
  );
};

const getUserIdByCPF = async (cpf) => {
  return await executeQuery(
    "SELECT idUsuario FROM usuario WHERE cpfUsuario = ?",
    [cpf]
  );
};

const insertAccount = async (agConta, numeroConta, saldoConta, idUsuario) => {
  return await executeQuery(
    "INSERT INTO conta (agConta, numeroConta, saldoConta, Usuario_Conta_idUsuario) VALUES (?, ?, ?, ?)",
    [agConta, numeroConta, saldoConta, idUsuario]
  );
};

module.exports = {
  getUserByCPF,
  getUserByEmail,
  insertUser,
  getUserIdByCPF,
  insertAccount,
};
