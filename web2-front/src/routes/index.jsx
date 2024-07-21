import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { ProtectedRoute } from "./protectedRoute";
import CefetMoney from "../pages/CefetMoney";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home";

export function MyRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CefetMoney />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}
