import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

export default function SideMenu() {
  const { clearToken } = useContext(AuthContext);
  const [menuUser, setMenuUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setMenuUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setMenuUser(null);
  };

  const handleExcluirConta = () => {
    console.log("excluir conta");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          bgcolor: "primary.main",
        },
      }}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>CEFET MONEY</h1>
          <Divider
            sx={{
              borderBottomWidth: 5,
              width: "90%",
            }}
          />
        </div>

        <List>
          <ListItem key={"Transferir"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GiPayMoney size={32} />
              </ListItemIcon>
              <ListItemText primary={"Transferir"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"Saque"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GiReceiveMoney size={32} />
              </ListItemIcon>
              <ListItemText primary={"Saque"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"Depósito"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GiMoneyStack size={32} />
              </ListItemIcon>
              <ListItemText primary={"Depósito"} />
            </ListItemButton>
          </ListItem>
        </List>
        <div style={{ bottom: 0, position: "absolute", width: "100%" }}>
          <Box sx={{ flexGrow: 0 }}>
            <Divider />
            <Tooltip title="Open settings">
              <Button
                onClick={handleOpenUserMenu}
                style={{ p: 0, color: "white" }}
              >
                Olá, user
              </Button>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={menuUser}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(menuUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>Dados da Conta</MenuItem>
              <Link to="/perfil" style={{ color: "#242424" }}>
                <MenuItem>Dados Pessoais</MenuItem>
              </Link>
              <MenuItem onClick={handleExcluirConta}>Excluir Conta</MenuItem>
              <MenuItem onClick={clearToken}>Sign Out</MenuItem>
            </Menu>
          </Box>
        </div>
      </Box>
    </Drawer>
  );
}
