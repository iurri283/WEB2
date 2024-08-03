const express = require("express");
const {
  getBalance,
  deposit,
  transfer,
} = require("../controllers/accountController");
const router = express.Router();

router.get("/saldo", getBalance); // Rota para obter saldo da conta
router.post("/deposito", deposit); // Rota para realizar depósito
router.post("/transferencia", transfer); // Rota para transferir fundos

module.exports = router;
