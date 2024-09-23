const {
  getTransactionService,
  getNomeService,
} = require("../services/transactionService");

const getTransaction = async (req, res) => {
  const { cpf } = req.userInfo;

  try {
    const transactions = await getTransactionService(cpf);
    res.status(200).json({ transactions: transactions });
  } catch (error) {
    res.status(error.status || 500).json({ mensagem: error.message });
  }
};

const getNome = async (req, res) => {
  const { idConta } = req.query;

  try {
    const nome = await getNomeService(idConta);
    res.status(200).json({ nome: nome });
  } catch (error) {
    res.status(error.status || 500).json({ mensagem: error.message });
  }
};

module.exports = { getTransaction, getNome };
