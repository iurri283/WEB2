const {
  getUserByCPF,
  getAccountByUserId,
  updateAccountBalance,
} = require("../models/accountModel");

const getBalanceService = async (cpf) => {
  const user = await getUserByCPF(cpf);
  if (user.length === 0)
    throw { status: 404, message: "Usuário não encontrado" };

  const account = await getAccountByUserId(user[0].idUsuario);
  if (account.length === 0)
    throw { status: 404, message: "Conta não encontrada" };

  return account[0].saldoConta;
};

const depositService = async (cpf, valor) => {
  if (valor <= 0) throw { status: 400, message: "Valor de depósito inválido" };

  const user = await getUserByCPF(cpf);
  if (user.length === 0)
    throw { status: 404, message: "Usuário não encontrado" };

  const account = await getAccountByUserId(user[0].idUsuario);
  if (account.length === 0)
    throw { status: 404, message: "Conta não encontrada" };

  const novoSaldo = parseFloat(account[0].saldoConta) + parseFloat(valor);
  await updateAccountBalance(account[0].numeroConta, novoSaldo);

  return { message: "Depósito realizado com sucesso", novoSaldo };
};

const transferService = async (cpfOrigem, cpfDestino, valor) => {
  if (valor <= 0)
    throw { status: 400, message: "Valor de transferência inválido" };

  const userOrigem = await getUserByCPF(cpfOrigem);
  if (userOrigem.length === 0)
    throw { status: 404, message: "Usuário de origem não encontrado" };

  const userDestino = await getUserByCPF(cpfDestino);
  if (userDestino.length === 0)
    throw { status: 404, message: "Usuário de destino não encontrado" };

  const accountOrigem = await getAccountByUserId(userOrigem[0].idUsuario);
  if (accountOrigem.length === 0)
    throw { status: 404, message: "Conta de origem não encontrada" };

  const accountDestino = await getAccountByUserId(userDestino[0].idUsuario);
  if (accountDestino.length === 0)
    throw { status: 404, message: "Conta de destino não encontrada" };

  if (accountOrigem[0].saldoConta < valor)
    throw { status: 400, message: "Saldo insuficiente" };

  const novoSaldoOrigem =
    parseFloat(accountOrigem[0].saldoConta) - parseFloat(valor);
  const novoSaldoDestino =
    parseFloat(accountDestino[0].saldoConta) + parseFloat(valor);

  await updateAccountBalance(accountOrigem[0].numeroConta, novoSaldoOrigem);
  await updateAccountBalance(accountDestino[0].numeroConta, novoSaldoDestino);

  return {
    message: "Transferência realizada com sucesso",
    novoSaldoOrigem,
    novoSaldoDestino,
  };
};

module.exports = { getBalanceService, depositService, transferService };
