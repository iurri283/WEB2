import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import SignIn from "../components/SignIn";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
// import Home from "./Home";

export default function Login() {
  const { isLogado } = useContext(AuthContext);

  console.log("login: ", isLogado);
  return (
    <>
      {isLogado ? (
        <Navigate to="/home" />
      ) : (
        <>
          <Header /> <SignIn />
        </>
      )}
    </>
  );
}
