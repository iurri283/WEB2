import { useState, useEffect } from "react";
import { api } from "../utils/api";

const useUser = () => {
  const token = localStorage.getItem("token");
  const [user, setUSer] = useState({});

  const handleGetUser = async () => {
    try {
      const resposta = await api.get(`user/info`); // retorna nas informações do usuário, sua conta
      setUSer(resposta?.data?.user);
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error);
    }
  };

  useEffect(() => {
    if (token) {
      handleGetUser();
    }
  }, [token]);

  return user;
};

export default useUser;
