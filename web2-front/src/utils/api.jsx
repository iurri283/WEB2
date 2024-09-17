import axios from "axios";

// instância da conexão local
const api = axios.create({
  baseURL: "http://localhost:3000/api/", // Substitua pela sua URL base
  timeout: 10000, // Tempo limite da solicitação em milissegundos (opcional)
  headers: {
    "Content-Type": "application/json", // Configuração de cabeçalhos personalizados (opcional)
  },
});

const apiConta = axios.create({
  baseURL: "http://localhost:3000/api/contas/", // Substitua pela sua URL base
  timeout: 10000, // Tempo limite da solicitação em milissegundos (opcional)
  headers: {
    "Content-Type": "application/json", // Configuração de cabeçalhos personalizados (opcional)
  },
});

api.interceptors.request.use(
  function (config) {
    // Obter o token do armazenamento local, ou de onde você o obtém
    const token = localStorage.getItem("token");
    if (token) {
      // Se o token existir, adicione-o aos cabeçalhos de autorização
      config.headers.Authorization = ` Bearer ${token}`;
    }
    return config;
  },
  function (erro) {
    // Se ocorrer um erro com a solicitação, retorne um Promessa rejeitada
    return Promise.reject(erro);
  }
);

export { api, apiConta };
