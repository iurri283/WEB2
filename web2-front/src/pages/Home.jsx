import { Navigate } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

const drawerWidth = 240;

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <>
      {token ? (
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
                sm={5}
                sx={{
                  bgcolor: "white",
                  borderRadius: "10px",
                  boxShadow: "5px 5px 3px 0px rgba(0, 0, 0, 0.75)",
                }}
              >
                <Grid item xs={12} sm={12} pr={2}>
                  <TextField
                    autoComplete="given-name"
                    name="nome"
                    fullWidth
                    disabled
                    id="nome"
                    label="Nome Completo"
                    variant="standard"
                    autoFocus
                    sx={{
                      color: "#008C9E",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#008C9E",
                        },
                        "&:hover fieldset": {
                          borderColor: "#008C9E",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#008C9E",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} pr={2}>
                  <TextField
                    autoComplete="given-name"
                    name="email"
                    fullWidth
                    disabled
                    id="email"
                    label="Email"
                    variant="standard"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} pr={2} pb={2}>
                  <TextField
                    fullWidth
                    disabled
                    name="senha"
                    label="Senha"
                    variant="standard"
                    type="password"
                    id="senha"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
