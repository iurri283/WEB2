const express = require("express");
const {
  getTransaction,
  getNome,
} = require("../controllers/transactionController");
const middlewareValidarJWT = require("../middlewares/validarJWT");
const router = express.Router();

router.get("/getTransactions", middlewareValidarJWT, getTransaction);
router.get("/getNome", middlewareValidarJWT, getNome);

module.exports = router;
