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
import Extrato from "../pages/Extrato";

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <SideMenu />
      <div style={{ flexGrow: 1 }}>{children}</div>
    </div>
  );
}

export function MyRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CefetMoney />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/transferencia"
            element={
              <Layout>
                <Transferencia />
              </Layout>
            }
          />
          <Route
            path="/saque"
            element={
              <Layout>
                <Saque />
              </Layout>
            }
          />
          <Route
            path="/deposito"
            element={
              <Layout>
                <Deposito />
              </Layout>
            }
          />
          <Route
            path="/extrato"
            element={
              <Layout>
                <Extrato />
              </Layout>
            }
          />
          <Route
            path="/dadosPessoais"
            element={
              <Layout>
                <PerfilUser />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

// Componente para incluir o SideMenu e conteúdo principal
// function HomeWithSideMenu() {
//   return (
//     <div style={{ display: "flex" }}>
//       <SideMenu />
//       <div style={{ flexGrow: 1 }}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="transferencia" element={<Transferencia />} />
//           <Route path="saque" element={<Saque />} />
//           <Route path="deposito" element={<Deposito />} />
//           <Route path="dadosPessoais" element={<PerfilUser />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }
