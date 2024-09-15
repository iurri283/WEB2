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

const getAccountByUserID = async (ID) => {
  return await executeQuery(
    "SELECT * FROM conta WHERE Usuario_Conta_idUsuario = ?",
    [ID]
  );
};

const sqlVerificarConta = async (numeroConta) => {
  return await executeQuery(
    "SELECT COUNT(*) as count FROM conta WHERE numeroConta = ?",
    [numeroConta]
  );
};

const updateUserByID = async (ID, DATA) => {
  return await executeQuery(
    `UPDATE usuario 
      SET 
        nomeUsuario = ?,
        cpfUsuario = ?,
        emailUsuario = ?,
        bairroUsuario = ?,
        cidadeUsuario = ?,
        complementoUsuario = ?,
        numeroUsuario = ?,
        ruaUsuario = ?
      WHERE idUsuario = ?`,
    [
      DATA?.nomeUsuario,
      DATA?.cpfUsuario,
      DATA?.emailUsuario,
      DATA?.bairroUsuario,
      DATA?.cidadeUsuario,
      DATA?.complementoUsuario,
      DATA?.numeroUsuario,
      DATA?.ruaUsuario,
      ID,
    ]
  );
};

module.exports = {
  getUserByCPF,
  getUserByEmail,
  insertUser,
  getUserIdByCPF,
  insertAccount,
  sqlVerificarConta,
  getAccountByUserID,
  updateUserByID,
};
