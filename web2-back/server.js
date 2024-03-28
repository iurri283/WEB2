const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const port = 3000;

app.use(express.json());
app.use(cors());

const jwt = require("jsonwebtoken");
const privateKey = "20193014464";

const db = {
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "cefetmoney",
};

const saltRounds = 10; // Número de "salt rounds" para gerar
// Função para encriptar a senha
async function encryptPassword(password) {
  try {
    // Gerar o salt
    const salt = await bcrypt.genSalt(saltRounds);
    // Encriptar a senha com o salt
    const hash = await bcrypt.hash(password, salt);
    return hash; // Retornar a senha encriptada
  } catch (error) {
    throw error;
  }
}

async function executeQuery(sql, params = []) {
  const connection = await mysql.createConnection(db);

  try {
    const [rows, fields] = await connection.execute(sql, params);
    return rows;
  } catch (error) {
    if (error.response) {
      setRespostaCadastro(error.response.data);
    }
  } finally {
    await connection.end();
  }
}

app.post("/login", async (req, res) => {
  const { cpf, senha } = req.body;

  const response = await executeQuery(
    "SELECT * FROM usuario WHERE cpfUsuario = ?",
    [cpf]
  );

  user = response[0];

  if (response.length > 0) {
    if (senha === user.senhaUsuario) {
      // Se a senha está correta, gerar o token JWT
      jwt.sign({ cpf }, privateKey, (err, token) => {
        if (err) {
          return res.status(500).json({ mensagem: "Erro ao gerar o JWT" });
        } else {
          console;
          return res
            .set("x-access-token", token)
            .json({ mensagem: "Login bem-sucedido", token, user });
        }
      });
    } else {
      return res.status(401).json({ mensagem: "Senha incorreta" });
    }
  } else {
    return res.status(401).json({ mensagem: "Usuário inexistente!" });
  }
});

app.post("/cadastro", async (req, res) => {
  const { nome, cpf, email, senha } = req.body;

  const response = await executeQuery(
    "SELECT COUNT(*) as qtd FROM usuario WHERE cpfUsuario = ?",
    [cpf]
  );

  const resposta = response[0];

  if (resposta.qtd > 0) {
    return res
      .status(400)
      .json({ titulo: "CPF inválido", mensagem: "CPF já cadastrado!" });
  }

  console.log("email: ", email);

  const response2 = await executeQuery(
    "SELECT COUNT(*) as qtd FROM usuario WHERE emailUsuario = ?",
    [email]
  );

  const resposta2 = response2[0];
  if (resposta2.qtd > 0) {
    return res
      .status(400)
      .json({ titulo: "Email inválido", mensagem: "Email já cadastrado!" });
  }

  const senhaEncriptada = await encryptPassword(senha);

  const result = await executeQuery(
    "INSERT INTO usuario (nomeUsuario, cpfUsuario, emailUsuario, senhaUsuario) VALUES (?,?,?,?)",
    [nome, cpf, email, senhaEncriptada]
  );

  if (result.affectedRows > 0) {
    return res
      .status(200)
      .json({
        titulo: "Usuario cadastrado",
        mensagem: "Usuário cadastrado com sucesso!",
      });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
