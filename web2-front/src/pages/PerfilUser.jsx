import { useState, useEffect } from "react";
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
import { InputCep, InputCpf } from "../components/Mascaras";
import axios from "axios";

const drawerWidth = 240;

function PerfilUser() {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        const data = response?.data;
        setAddress({
          cidade: data?.localidade || "",
          bairro: data?.bairro || "",
          rua: data?.logradouro,
          numero: "",
          complemento: "",
        });
      } catch (error) {
        console.error("Erro ao buscar o endereço:", error);
      }
    };
    fetchAddress();
  }, [cep]);

  const handleCepChange = (event) => {
    setCep(event.target.value);
  };

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
            R$ 5000,00
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        gap={2}
        sx={{
          flexGrow: 1,
          bgcolor: "#008C9E",
          width: `calc(100% - ${drawerWidth}px)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Toolbar style={{ position: "fixed", top: 0 }} />
        <Box
          noValidate
          sx={{ mt: 5 }}
          gap={3}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={2}
            sm={3}
            sx={{
              bgcolor: "white",
              borderRadius: "10px",
              boxShadow: "5px 5px 3px 0px rgba(0, 0, 0, 0.75)",
              justifyContent: "center",
            }}
          >
            <h2 style={{ color: "#008C9E", fontSize: "2rem" }}>
              Dados Pessoais
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
                name="nome"
                label="Nome"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={12} pr={2} pb={2}>
              <InputCpf fullWidth name="cpf" disabled variant="standard" />
            </Grid>
            <Grid item xs={12} sm={12} pr={2} pb={2}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                variant="standard"
              />
            </Grid>
          </Grid>

          {/* dados do endereço */}
          <Grid
            container
            spacing={2}
            sm={3}
            sx={{
              bgcolor: "white",
              borderRadius: "10px",
              boxShadow: "5px 5px 3px 0px rgba(0, 0, 0, 0.75)",
              justifyContent: "center",
            }}
          >
            <h2 style={{ color: "#008C9E", fontSize: "2rem" }}>Endereço</h2>
            <hr
              style={{
                width: "90%",
                borderTop: "2px solid #008C9E",
              }}
            />
            <Grid item xs={12} sm={12} pr={2} pb={2}>
              <InputCep
                fullWidth
                name="cep"
                variant="standard"
                value={cep}
                onChange={handleCepChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} pr={2} pb={2}>
              <TextField
                fullWidth
                name="cidade"
                label="Cidade"
                variant="standard"
                value={address.cidade}
              />
            </Grid>
            <Grid item xs={12} sm={12} pr={2} pb={2}>
              <TextField
                fullWidth
                name="bairro"
                label="Bairro"
                variant="standard"
                value={address.bairro}
              />
            </Grid>
            <Grid item xs={12} sm={12} pr={2} pb={2}>
              <TextField
                fullWidth
                name="rua"
                label="Rua"
                variant="standard"
                value={address.rua}
              />
            </Grid>
            <Grid item xs={12} sm={12} pr={2} pb={2}>
              <TextField
                fullWidth
                name="numero"
                label="Numero"
                variant="standard"
                value={address.numero}
                onChange={(e) =>
                  setAddress({ ...address, numero: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} pr={2} pb={2}>
              <TextField
                fullWidth
                name="complemento"
                label="Complemento"
                variant="standard"
                value={address.complemento}
                onChange={(e) =>
                  setAddress({ ...address, complemento: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Grid item xs={12} pb={2}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "black",
              "&:hover": {
                bgcolor: "#008C9E ",
                color: "white",
              },
            }}
          >
            Alterar
          </Button>
        </Grid>
      </Box>
    </Box>
  );
}

export default PerfilUser;
