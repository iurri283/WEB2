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

const getAccountByUserId = async (userId) => {
  return await executeQuery(
    "SELECT * FROM conta WHERE Usuario_Conta_idUsuario = ?",
    [userId]
  );
};

const updateAccountBalance = async (numeroConta, novoSaldo) => {
  return await executeQuery(
    "UPDATE conta SET saldoConta = ? WHERE numeroConta = ?",
    [novoSaldo, numeroConta]
  );
};

module.exports = {
  getUserByCPF,
  getAccountByUserId,
  updateAccountBalance,
};
