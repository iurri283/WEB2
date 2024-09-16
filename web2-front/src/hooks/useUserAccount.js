import { useState, useEffect } from "react";
import { api } from "../utils/api";

const useUserAccount = () => {
  const token = localStorage.getItem("token");
  const [account, setAccount] = useState({});

  const handleGetUserAccount = async () => {
    try {
      const resposta = await api.get(`user/info`); // retorna nas informações do usuário, sua conta
      console.log(resposta);
      setAccount(resposta?.data?.account[0]);
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error);
    }
  };

  useEffect(() => {
    if (token) {
      handleGetUserAccount();
    }
  }, [token]);

  return account;
};

export default useUserAccount;
