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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const drawerWidth = 240;

function Extrato() {
  const token = localStorage.getItem("token");
  const account = useAccount();
  const [extrato, setExtrato] = useState([]);
  const [nomes, setNomes] = useState({});
  const [filtro, setFiltro] = useState("");

  const getExtrato = async () => {
    const resposta = await api.get(`transacoes/getTransactions`);
    const transactions = resposta?.data?.transactions || [];
    setExtrato(transactions);

    const nomesTemp = {};
    for (const transaction of transactions) {
      if (transaction.tipoTransacao === "TRANSFERENCIA") {
        const idConta =
          transaction.contaDestino_idConta === account.idConta
            ? transaction.conta_idConta
            : transaction.contaDestino_idConta;
        if (!nomesTemp[idConta]) {
          const nomeResposta = await api.get(
            `transacoes/getNome?idConta=${idConta}`
          );
          nomesTemp[idConta] = nomeResposta?.data?.nome[0]?.nomeUsuario || "";
        }
      }
    }
    setNomes(nomesTemp);
  };

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const handleDataInicioChange = (event) => {
    setDataInicio(event.target.value);
  };

  const handleDataFimChange = (event) => {
    setDataFim(event.target.value);
  };

  const extratoFiltrado = extrato.filter((transacao) => {
    if (!filtro && !dataInicio && !dataFim) return true;

    const dataTransacao = moment(transacao.dataTransacao);
    const isTipoMatch = filtro ? transacao.tipoTransacao === filtro : true;
    const isDataInicioMatch = dataInicio
      ? dataTransacao.isSameOrAfter(moment(dataInicio))
      : true;
    const isDataFimMatch = dataFim
      ? dataTransacao.isSameOrBefore(moment(dataFim))
      : true;

    return isTipoMatch && isDataInicioMatch && isDataFimMatch;
  });

  useEffect(() => {
    if (token) getExtrato();
  }, [token]);

  return (
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
          sx={{ mt: 4 }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Extrato Bancário</h2>

          <Box
            sx={{ mt: 2 }}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
            }}
          >
            <FormControl sx={{ minWidth: 200, mb: 2 }}>
              <InputLabel shrink htmlFor="filtro-label">
                Filtrar por Tipo
              </InputLabel>
              <Select
                labelId="filtro-label"
                id="filtro"
                value={filtro}
                label="Filtrar por Tipo"
                onChange={handleFiltroChange}
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                <MenuItem value="DEPOSITO">Depósito</MenuItem>
                <MenuItem value="SAQUE">Saque</MenuItem>
                <MenuItem value="TRANSFERENCIA">Transferência</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200, mb: 2, ml: 2 }}>
              <InputLabel shrink htmlFor="data-inicio">
                Data Início
              </InputLabel>
              <input
                type="date"
                id="data-inicio"
                value={dataInicio}
                onChange={handleDataInicioChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </FormControl>

            <FormControl sx={{ minWidth: 200, mb: 2, ml: 2 }}>
              <InputLabel shrink htmlFor="data-fim">
                Data Fim
              </InputLabel>
              <input
                type="date"
                id="data-fim"
                value={dataFim}
                onChange={handleDataFimChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </FormControl>

            <FormControl sx={{ mb: 2, ml: 2 }}>
              <button
                onClick={() => {
                  setFiltro("");
                  setDataInicio("");
                  setDataFim("");
                }}
                style={{
                  padding: "10px 20px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#008C9E",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Resetar Filtros
              </button>
            </FormControl>
          </Box>

          {extratoFiltrado.length === 0 ? (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Não foi realizada nenhuma transação nesta conta.
            </Typography>
          ) : (
            <List
              sx={{
                width: "80vw",
                bgcolor: "background.paper",
                height: "80vh",
                overflowY: "scroll",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              {extratoFiltrado.map((element, index) => {
                const nomeUsuario =
                  element.tipoTransacao === "TRANSFERENCIA"
                    ? element.contaDestino_idConta === account.idConta
                      ? nomes[element.conta_idConta]
                      : nomes[element.contaDestino_idConta]
                    : "";

                return (
                  <div key={index}>
                    <ListItem
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "16px",
                        backgroundColor:
                          element.tipoTransacao === "DEPOSITO" ||
                          (element.tipoTransacao === "TRANSFERENCIA" &&
                            element.contaDestino_idConta === account.idConta)
                            ? "#e6f7e6"
                            : "#fbeaea",
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                          >
                            {element.tipoTransacao === "TRANSFERENCIA" &&
                            element.contaDestino_idConta === account.idConta
                              ? "TRANSFERENCIA RECEBIDA DE " +
                                (nomeUsuario ? nomeUsuario.toUpperCase() : "")
                              : element.tipoTransacao === "TRANSFERENCIA"
                              ? "TRANSFERENCIA ENVIADA PARA " +
                                (nomeUsuario ? nomeUsuario.toUpperCase() : "")
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
                            (element.tipoTransacao === "TRANSFERENCIA" &&
                              element.contaDestino_idConta === account.idConta)
                              ? "green"
                              : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {element.tipoTransacao === "DEPOSITO" ||
                        (element.tipoTransacao === "TRANSFERENCIA" &&
                          element.contaDestino_idConta === account.idConta)
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
                );
              })}
            </List>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Extrato;
