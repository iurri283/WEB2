import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { InputCpf } from "../components/Mascaras";
import useAccount from "../hooks/useAccount";
import { useEffect, useState } from "react";
import { apiConta } from "../utils/api";

const drawerWidth = 240;

function Transferencia() {
  const account = useAccount();
  const [reloadPage, setReloadPage] = useState(false);
  const [valorTransferencia, setValorTransferencia] = useState(0);
  const [cpfDestino, setCpfDestino] = useState("");
  const [message, setMessage] = useState("");

  const realizarTransferencia = async () => {
    if (isNaN(valorTransferencia)) return setMessage("Valor não numérico!");
    // pegar o cpf do usuario logado e o valor digitado no textfield
    const body = { cpfDestino: cpfDestino, valor: valorTransferencia };
    try {
      await apiConta.post(`transferencia`, body);
      setReloadPage(true);
    } catch (e) {
      if (e.response?.status === 400 || e.response?.status === 404) {
        setMessage(e.response.data?.mensagem || "Erro ao realizar o saque");
      } else {
        setMessage("Erro no servidor. Tente novamente mais tarde.");
      }
    }
  };

  useEffect(() => {
    if (reloadPage) {
      window.location.reload();
    }
  }, [reloadPage]);

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#008C9E",
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
          bgcolor: "#008C9E",
          width: `calc(100% - ${drawerWidth}px)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Toolbar style={{ position: "fixed", top: 0 }} />
        <Box
          noValidate
          sx={{ mt: 5 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={2}
            sm={6}
            sx={{
              bgcolor: "white",
              borderRadius: "10px",
              boxShadow: "5px 5px 3px 0px rgba(0, 0, 0, 0.75)",
              justifyContent: "center",
            }}
          >
            <h2 style={{ color: "#008C9E", fontSize: "2rem" }}>
              Área de Transferencia
            </h2>
            <hr
              style={{
                width: "90%",
                borderTop: "2px solid #008C9E",
              }}
            />
            <Grid item xs={12} sm={12} pr={2}>
              <InputCpf
                autoComplete="given-name"
                name="cpf"
                variant="standard"
                autoFocus
                onChange={(e) => setCpfDestino(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} pb={2} pr={2}>
              <TextField
                fullWidth
                name="valorTransferencia"
                label="Digite o valor a ser transferido"
                variant="standard"
                onChange={(e) => setValorTransferencia(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={6}
              pb={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#008C9E",
                  color: "white",
                  "&:hover": {
                    bgcolor: "white",
                    color: "black",
                  },
                }}
                onClick={realizarTransferencia}
              >
                Realizar Transferência
              </Button>
              {message && (
                <Typography variant="body2" color="error" align="center" mt={2}>
                  {message}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Transferencia;
