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

import { apiConta } from "../utils/api";
import { useEffect, useState } from "react";
import useAccount from "../hooks/useAccount";
import useUser from "../hooks/useUser";

const drawerWidth = 240;

function Deposito() {
  const [reloadPage, setReloadPage] = useState(false);
  const user = useUser();
  const account = useAccount();
  const [valorDeposito, setValorDeposito] = useState(0);

  const realizarDeposito = async () => {
    // pegar o cpf do usuario logado e o valor digitado no textfield
    const body = { cpf: user?.cpfUsuario, valor: valorDeposito };
    try {
      const resposta = await apiConta.post(`deposito`, body);
      console.log(resposta);
      setReloadPage(true);
    } catch (error) {
      console.error("Erro ao tentar fazer o depósito:", error);
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
            sm={10}
            sx={{
              bgcolor: "white",
              borderRadius: "10px",
              boxShadow: "5px 5px 3px 0px rgba(0, 0, 0, 0.75)",
              justifyContent: "center",
            }}
          >
            <h2 style={{ color: "#008C9E", fontSize: "2rem" }}>
              Área de Depósito
            </h2>
            <hr
              style={{
                width: "90%",
                borderTop: "2px solid #008C9E",
              }}
            />
            <Grid item xs={12} sm={12} pr={2} pb={2}>
              <TextField
                fullWidth
                name="deposito"
                label="Digite o valor a ser depositado"
                variant="standard"
                onChange={(e) => setValorDeposito(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              pb={2}
              sx={{ display: "flex", justifyContent: "center" }}
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
                onClick={() => realizarDeposito()}
              >
                Realizar Depósito
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Deposito;
