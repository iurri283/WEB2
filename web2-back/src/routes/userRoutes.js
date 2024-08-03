/**
 * Aonde são armazenadas as rotas da aplicação
 * Mapeando URLs para controllers específicos
 */

const express = require("express");
const { login, register, userInfo } = require("../controllers/userController");
const middlewareValidarJWT = require("../middlewares/validarJWT");
const router = express.Router();

router.post("/login", login);
router.post("/cadastro", register);
router.get("/user/info", middlewareValidarJWT, userInfo);

module.exports = router;
