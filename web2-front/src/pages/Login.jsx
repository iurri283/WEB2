import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import SignIn from "../components/SignIn";

// import Home from "./Home";

export default function Login() {
  const token = localStorage.getItem("token");

  return (
    <>
      {token ? (
        <Navigate to="/home" />
      ) : (
        <>
          <Header /> <SignIn />
        </>
      )}
    </>
  );
}
