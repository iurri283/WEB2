import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  List,
  Toolbar,
  Typography,
  ListItem,
  ListItemText,
} from "@mui/material";
import useAccount from "../hooks/useAccount";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import moment from "moment"; // Para formatação de datas
import useUser from "../hooks/useUser";

const drawerWidth = 240;

function Extrato() {
  const token = localStorage.getItem("token");
  const account = useAccount();
  const [extrato, setExtrato] = useState([]);

  const user = useUser();
  console.log(user);

  const getExtrato = async () => {
    const resposta = await api.get(`transacoes/getTransactions`);
    console.log(resposta?.data?.transactions || []);
    setExtrato(resposta?.data?.transactions || []);
  };

  useEffect(() => {
    if (token) getExtrato();
  }, [token]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          bgcolor: "#f5f5f5",
          height: "100vh",
          "& .css-i7soq9-MuiPaper-root-MuiAppBar-root": { boxShadow: "none" },
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            bgcolor: "#008C9E",
          }}
        >
          <Toolbar style={{ display: "flex", justifyContent: "end" }}>
            <Typography variant="h6" noWrap component="div">
              {account?.saldoConta?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }) || "R$ 0,00"}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "#f5f5f5",
            width: `calc(100% - ${drawerWidth}px)`,
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Toolbar style={{ position: "fixed", top: 0 }} />

          <Box
            sx={{ mt: 5 }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>Extrato Bancário</h2>

            <List
              sx={{
                width: "80vw",
                bgcolor: "background.paper",
                height: "80vh",
                overflowY: "scroll",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              {extrato.map((element, index) => (
                <div key={index}>
                  <ListItem
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "16px",
                      backgroundColor:
                        element.tipoTransacao === "DEPOSITO" ||
                        element.contaDestino_idConta === user.idUsuario
                          ? "#e6f7e6"
                          : "#fbeaea",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {element.tipoTransacao === "TRANSFERENCIA" &&
                          element.contaDestino_idConta === user.idUsuario
                            ? "TRANSFERENCIA RECEBIDA"
                            : element.tipoTransacao === "TRANSFERENCIA"
                            ? "TRANSFERENCIA ENVIADA"
                            : element.tipoTransacao}
                        </Typography>
                      }
                      secondary={moment(element.dataTransacao).format(
                        "DD/MM/YYYY HH:mm"
                      )}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color:
                          element.tipoTransacao === "DEPOSITO" ||
                          element.contaDestino_idConta === user.idUsuario
                            ? "green"
                            : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {element.tipoTransacao === "DEPOSITO" ||
                      element.contaDestino_idConta === user.idUsuario
                        ? "+"
                        : "-"}{" "}
                      R$
                      {element.valorTransacao.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Extrato;
