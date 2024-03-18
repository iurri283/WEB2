import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";
import CefetMoney from "../Pages/CefetMoney";
import Sobre from "../Pages/Sobre";
import Login from "../Pages/Login";
import Cadastro from "../Pages/Cadastro";
import Home from "../Pages/Home";

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
