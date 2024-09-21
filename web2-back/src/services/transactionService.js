const { getAccountByUserId } = require("../models/accountModel");
const { getUserByCPF } = require("../models/userModel");
const { getTransactions } = require("../models/transactionModel");

const getTransactionService = async (cpf) => {
  let user, account, transactions;

  try {
    user = await getUserByCPF(cpf);
  } catch (e) {
    throw "Erro ao buscar o usuário: " + e.toString();
  }

  try {
    account = await getAccountByUserId(user[0].idUsuario);
  } catch (e) {
    throw "Erro ao buscar a conta do usuário: " + e.toString();
  }
  try {
    transactions = await getTransactions(account[0].idConta);
  } catch (e) {
    throw "Erro ao buscar as transações: " + e.toString();
  }

  return transactions;
};

module.exports = {
  getTransactionService,
};
