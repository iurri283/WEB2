const { getTransactionService } = require("../services/transactionService");

const getTransaction = async (req, res) => {
  const { cpf } = req.userInfo;

  try {
    const transactions = await getTransactionService(cpf);
    res.status(200).json({ transactions: transactions });
  } catch (error) {
    res.status(error.status || 500).json({ mensagem: error.message });
  }
};

module.exports = { getTransaction };
