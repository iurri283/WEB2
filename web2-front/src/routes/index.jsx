import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { ProtectedRoute } from "./protectedRoute";
import CefetMoney from "../pages/CefetMoney";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home";
import PerfilUser from "../pages/PerfilUser";
import SideMenu from "../components/SideMenu";
import Transferencia from "../pages/Transferencia";
import Saque from "../pages/Saque";
import Deposito from "../pages/Deposito";

export function MyRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CefetMoney />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home/*" element={<HomeWithSideMenu />} />
          <Route path="/transferencia" element={<HomeWithSideMenu />} />
          <Route path="/saque" element={<HomeWithSideMenu />} />
          <Route path="/deposito" element={<HomeWithSideMenu />} />
          <Route path="/dadosPessoais" element={<HomeWithSideMenu />} />
        </Routes>
      </Router>
    </>
  );
}

// Componente para incluir o SideMenu e conteúdo principal
function HomeWithSideMenu() {
  return (
    <div style={{ display: "flex" }}>
      <SideMenu />
      <div style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="transferencia" element={<Transferencia />} />
          <Route path="saque" element={<Saque />} />
          <Route path="deposito" element={<Deposito />} />
          <Route path="dadosPessoais" element={<PerfilUser />} />
        </Routes>
      </div>
    </div>
  );
}
