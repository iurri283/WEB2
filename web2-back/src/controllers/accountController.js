const {
  getBalanceService,
  depositService,
  saqueService,
  transferService,
} = require("../services/accountService");

const getBalance = async (req, res) => {
  try {
    const { cpf } = req.query;
    const balance = await getBalanceService(cpf);
    res.status(200).json({ saldo: balance });
  } catch (error) {
    res.status(error.status || 500).json({ mensagem: error.message });
  }
};

const deposit = async (req, res) => {
  try {
    const { cpf, valor } = req.body;
    const response = await depositService(cpf, valor);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({ mensagem: error.message });
  }
};

const saque = async (req, res) => {
  try {
    const { cpf, valor } = req.body;
    const response = await saqueService(cpf, valor);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({ mensagem: error.message });
  }
};

const transfer = async (req, res) => {
  const { cpf } = req.userInfo;
  try {
    const { cpfDestino, valor } = req.body;
    const response = await transferService(cpf, cpfDestino, valor);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({ mensagem: error.message });
  }
};

module.exports = { getBalance, deposit, saque, transfer };
