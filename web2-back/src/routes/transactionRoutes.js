const express = require("express");
const { getTransaction } = require("../controllers/transactionController");
const middlewareValidarJWT = require("../middlewares/validarJWT");
const router = express.Router();

router.get("/getTransactions", middlewareValidarJWT, getTransaction);
// router.post("/getTransactions", middlewareValidarJWT, deposit);

module.exports = router;
