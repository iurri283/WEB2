import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link2 from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { InputCpf } from "./Mascaras";
import { api } from "../utils/api";
import { useState } from "react";
// import { useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      pb={3}
      {...props}
    >
      {"Copyright © "}
      <Link2 color="inherit" href="">
        Desenvolvimento Web II
      </Link2>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const dados = {
      nome: data.get("nome"),
      cpf: data.get("cpf"),
      email: data.get("email"),
      senha: data.get("senha"),
    };

    try {
      const resposta = await api.post("cadastro", dados);

      if (resposta?.status === 200) {
        window.location.href = "/login";
      }
    } catch (e) {
      if (e.response?.status === 400) {
        console.log(e);
        setMessage(e.response.data?.mensagem || "Erro no cadastro");
      } else {
        setMessage("Erro no servidor. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        height: "100vh",
        backgroundColor: "white",
        borderRadius: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid",
          borderRadius: 1,
          boxShadow: 3,
          padding: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#008C9E" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="given-name"
                name="nome"
                required
                fullWidth
                id="nome"
                label="Nome Completo"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="given-name"
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <InputCpf
                autoComplete="given-name"
                name="cpf"
                required
                fullWidth
                id="cpf"
                label="CPF"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="senha"
                label="Senha"
                type="password"
                id="senha"
                autoComplete="new-password"
                // onChange={(e) => setSenha(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#008C9E",
              "&:hover": {
                bgcolor: "#008C8F",
              },
            }}
          >
            Cadastrar
          </Button>
          {message && (
            <Typography variant="body2" color="error" align="center">
              {message}
            </Typography>
          )}
        </Box>
      </Box>
      <Copyright sx={{ mt: 2 }} />
    </Container>
  );
}
