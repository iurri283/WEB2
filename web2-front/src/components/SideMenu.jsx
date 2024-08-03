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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useLocation } from "react-router-dom";
import { api } from "../utils/api";

const textColor = "white";
const iconColor = "white";
const dividerColor = "white";

export default function SideMenu() {
  const { pathname } = useLocation();
  console.log(pathname);
  const { clearToken } = useContext(AuthContext);
  const [menuUser, setMenuUser] = useState(null);
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");

  const handleOpenUserMenu = (event) => {
    setMenuUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setMenuUser(null);
  };

  const handleExcluirConta = () => {
    console.log("excluir conta");
  };

  const handleSignOut = () => {
    clearToken();
    window.location.href = "/login";
  };

  const handleGetUser = async () => {
    try {
      const resposta = await api.get(`user/info`);
      console.log(resposta);
      setName(resposta?.data?.nomeUsuario);
    } catch (error) {
      console.error("Erro ao obter dados do crítico:", error);
    }
  };

  useEffect(() => {
    if (token) {
      handleGetUser();
    }
  }, [token]);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        flexShrink: 0,
        width: "240px",
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          bgcolor: "#008C9E",
          width: "240px",
          overflowX: "hidden",
          borderRightWidth: "5px",
          borderColor: dividerColor,
        },
      }}
    >
      <Box sx={{ width: 240 }} role="presentation">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button component={Link} to="/home">
            <h1 style={{ color: "white" }}>CEFET MONEY</h1>
          </Button>

          <Divider
            sx={{
              borderBottomWidth: 5,
              width: "90%",
              borderColor: dividerColor,
            }}
          />
        </div>

        <List>
          <ListItem key={"Transferir"} disablePadding>
            <ListItemButton
              component={Link}
              to="/transferencia"
              selected={pathname === "/transferencia"}
            >
              <ListItemIcon sx={{ color: iconColor }}>
                <GiPayMoney size={32} />
              </ListItemIcon>
              <ListItemText primary={"Transferir"} sx={{ color: textColor }} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"Saque"} disablePadding>
            <ListItemButton
              component={Link}
              to="/saque"
              selected={pathname === "/saque"}
            >
              <ListItemIcon sx={{ color: iconColor }}>
                <GiReceiveMoney size={32} />
              </ListItemIcon>
              <ListItemText primary={"Saque"} sx={{ color: textColor }} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"Depósito"} disablePadding>
            <ListItemButton
              component={Link}
              to="/deposito"
              selected={pathname === "/deposito"}
            >
              <ListItemIcon sx={{ color: iconColor }}>
                <GiMoneyStack size={32} />
              </ListItemIcon>
              <ListItemText primary={"Depósito"} sx={{ color: textColor }} />
            </ListItemButton>
          </ListItem>
        </List>
        <div style={{ bottom: 0, position: "absolute", width: "100%" }}>
          <Box sx={{ flexGrow: 0 }}>
            <Divider
              sx={{
                borderBottomWidth: 3,
                width: "90%",
                borderColor: dividerColor,
              }}
            />
            <Tooltip title="Open settings">
              <Button
                onClick={handleOpenUserMenu}
                style={{ p: 0, color: "white" }}
              >
                Olá, {name.split(" ")[0]}
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
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </Box>
        </div>
      </Box>
    </Drawer>
  );
}
