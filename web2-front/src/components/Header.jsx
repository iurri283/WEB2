import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Logo from "../assets/bitcoin-aceito.png";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#008C9E" }}>
      <AppBar position="static" sx={{ bgcolor: "#008C9E" }}>
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
          <Link to="/login" style={{ padding: "2px" }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "black",
                "&:hover": {
                  bgcolor: "#008C9E",
                  color: "white",
                },
              }}
            >
              Login
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
