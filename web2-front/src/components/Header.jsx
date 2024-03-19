import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import "../styles/style.css";

import Logo from "../assets/bitcoin-aceito.png";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">
              <img
                src={Logo}
                alt=""
                style={{ height: "32px", width: "32px" }}
              />
            </Link>
          </Typography>

          <Link to="/login">
            <Button color="inherit" className="button-header">
              Login
            </Button>
          </Link>
          <Link to="/sobre">
            <Button color="inherit" className="button-header">
              Sobre
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
