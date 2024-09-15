/**
 * Aonde são armazenadas as rotas da aplicação
 * Mapeando URLs para controllers específicos
 */

const express = require("express");
const {
  login,
  register,
  userInfo,
  changeUserInfo,
} = require("../controllers/userController");
const middlewareValidarJWT = require("../middlewares/validarJWT");
const router = express.Router();

router.post("/login", login);
router.post("/cadastro", register);
router.get("/user/info", middlewareValidarJWT, userInfo);
router.post("/user/changeInfo", middlewareValidarJWT, changeUserInfo);

module.exports = router;
