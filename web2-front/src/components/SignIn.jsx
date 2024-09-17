import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LinkMui from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Link } from "react-router-dom";
import { InputCpf } from "./Mascaras";
import { api } from "../utils/api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
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
      <LinkMui color="inherit" href="">
        Desenvolvimento Web II
      </LinkMui>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const { handleTokenLogin } = useContext(AuthContext);
  const [reloadPage, setReloadPage] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const DATA = new FormData(event.currentTarget);

    const DADOS = { cpf: DATA.get("cpf"), senha: DATA.get("senha") };

    try {
      const RESPOSTA = await api.post("login", DADOS);

      if (RESPOSTA.status == 200) {
        await handleTokenLogin(RESPOSTA?.data?.token);
        setReloadPage(true);
      }
    } catch (e) {
      if (
        e.response?.status === 400 ||
        e.response?.status === 404 ||
        e.response?.status === 401
      ) {
        setMessage(e.response.data?.mensagem || "Erro ao realizar o login");
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
    <>
      {/* <ToastContainer /> */}

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
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <InputCpf
              autoComplete="given-name"
              name="cpf"
              required
              fullWidth
              id="cpf"
              label="CPF"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              autoComplete="new-password"
              // onChange={(e) => setSenha(e.target.value)}
            />
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
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/cadastro"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Cadastre-se
                </Link>
              </Grid>
            </Grid>
            {message && (
              <Typography variant="body2" color="error" align="center">
                {message}
              </Typography>
            )}
          </Box>
        </Box>
        <Copyright sx={{ mt: 2 }} />
      </Container>
    </>
  );
}
