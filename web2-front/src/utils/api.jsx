import axios from "axios";

// instância da conexão local
const api = axios.create({
  baseURL: "http://localhost:3000/", // Substitua pela sua URL base
  timeout: 10000, // Tempo limite da solicitação em milissegundos (opcional)
  headers: {
    "Content-Type": "application/json", // Configuração de cabeçalhos personalizados (opcional)
  },
});

export { api };
