const express = require("express");
const {
  getBalance,
  deposit,
  saque,
  transfer,
} = require("../controllers/accountController");
const middlewareValidarJWT = require("../middlewares/validarJWT");
const router = express.Router();

router.get("/saldo", middlewareValidarJWT, getBalance); // Rota para obter saldo da conta
router.post("/deposito", middlewareValidarJWT, deposit); // Rota para realizar depósito
router.post("/saque", middlewareValidarJWT, saque); // Rota para realizar saque
router.post("/transferencia", middlewareValidarJWT, transfer); // Rota para transferir fundos

module.exports = router;
