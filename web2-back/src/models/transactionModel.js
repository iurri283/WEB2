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

const getTransactions = async (idConta) => {
  return await executeQuery(
    "SELECT * FROM transacao WHERE conta_idConta = ? or contaDestino_idConta = ?",
    [idConta, idConta]
  );
};

const getOtherAccount = async (idConta) => {
  return await executeQuery(
    "select nomeUsuario from usuario,conta where conta.idConta = ? and idUsuario = conta.Usuario_Conta_idUsuario;",
    [idConta]
  );
};

module.exports = {
  getTransactions,
  getOtherAccount,
};
