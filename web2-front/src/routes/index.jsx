import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";
import CefetMoney from "../pages/CefetMoney";
import Sobre from "../pages/Sobre";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home";

export function MyRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CefetMoney />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute user={true}>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
