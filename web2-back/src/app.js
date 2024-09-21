const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api/contas", accountRoutes);
app.use("/api/transacoes", transactionRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
